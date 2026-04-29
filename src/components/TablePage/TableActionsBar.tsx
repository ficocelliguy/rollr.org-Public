"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ListIcon from "@mui/icons-material/List";
import SaveIcon from "@mui/icons-material/Save";
import { useModal } from "@/components/TablePage/ModalProvider/ModalContext";
import type { Player } from "@/types/player";
import type { TableStatus } from "@/components/TablePage/types";
import { DEFAULT_PROFILE_PIC } from "@/data/values";
import {ProfilePic} from "@/components/shared/ProfilePic";

export interface TableActionProps {
    isInEditMode: boolean;
    numPlayers: number;
    onDeleteTable?: () => void | Promise<void>;
    onEditModeChange: (nextValue: boolean) => void;
    onJoinWaitlist?: () => void | Promise<void>;
    onLeaveTable?: () => void | Promise<void>;
    onPromoteWaitlistPlayer?: (playerId: number) => void;
    onSave: () => void;
    slots: number;
    tableStatus: TableStatus;
    waitlistPlayers: Player[];
}

export default function TableActionsBar(props: TableActionProps) {
    const { hideModal, showModal } = useModal();
    const {
        isInEditMode,
        numPlayers,
        onDeleteTable,
        onEditModeChange,
        onJoinWaitlist,
        onLeaveTable,
        onPromoteWaitlistPlayer,
        onSave,
        slots,
        tableStatus,
        waitlistPlayers,
    } = props;
    const {isOwner, isPlayer, isDM, onWaitlist} = tableStatus;

    const canEditTable = isOwner && !isInEditMode;
    const canSaveTable = isOwner && isInEditMode;
    const canViewWaitlist = isOwner || isDM || waitlistPlayers.length > 0;

    const renderPlayerWaitlistModalContent = (canMovePlayersToTable?: boolean): ReactNode => {
        if (waitlistPlayers.length === 0) {
            return <p>Waitlist is empty!</p>;
        }

        return (
            <>
                <ul className="gap-8 px-6">
                    {waitlistPlayers.map((player) => (
                        <li
                            className={`${canMovePlayersToTable ? 'bg-amber-100 cursor-pointer' : 'bg-gray-200'} mb-8 flex flex-row flex-start space-between items-center gap-3 p-2 rounded`}
                            key={player.id}
                            onClick={() => canMovePlayersToTable ? onPromoteWaitlistPlayer?.(player.id) : undefined}
                            tabIndex={0}
                        >
                            <ProfilePic username={player.username} profilePicUrl={player.imageUrl} />
                            <div>{player.username}</div>
                        </li>
                    ))}
                </ul>
                <DialogActions>
                    <Button onClick={() => hideModal()}>Close</Button>
                </DialogActions>
            </>
        )
    }

    return (
        <Grid container direction="column" spacing={1}>
            <Grid container direction="row">
                <Typography color="white" sx={{ textShadow:'4px 4px 6px rgba(0, 0, 0, 0.5)' }}>
                    Players: {numPlayers} / {slots}
                </Typography>
            </Grid>

            <Grid container direction="row">
                {!isOwner && !isPlayer && !isDM && !onWaitlist && (
                    <Button onClick={() => onJoinWaitlist?.()} sx={buttonStyle}>
                        Join Waitlist
                    </Button>
                )}

                {!isOwner && (isPlayer || onWaitlist) && (
                    <Button onClick={() => onLeaveTable?.()} sx={buttonStyle}>
                        {onWaitlist ? "Leave Waitlist" : "Leave Table"}
                    </Button>
                )}

                { canEditTable ? (
                    <>
                        <Button onClick={() => onEditModeChange(true)} sx={buttonStyle} endIcon={<EditIcon/>}>
                            Edit
                        </Button>
                        {canViewWaitlist ? (
                            <Button
                                endIcon={<ListIcon />}
                                onClick={() => showModal(renderPlayerWaitlistModalContent(false), "Waitlist Players:")}
                                sx={buttonStyle}
                            >
                                View Waitlist
                            </Button>
                        ) : null}
                    </>
                ) : canSaveTable ? (
                    <>
                        <Button onClick={onSave} sx={buttonStyle} endIcon={<SaveIcon/>}>
                            Save
                        </Button>
                        <Button onClick={() => onEditModeChange(false)} sx={buttonStyle}>
                            Cancel
                        </Button>
                        <Button
                            endIcon={<ListIcon />}
                            onClick={() => showModal(renderPlayerWaitlistModalContent(true), "Waitlist Players:")}
                            sx={buttonStyle}
                        >
                            Edit Waitlist
                        </Button>
                    </>
                ) : null}

                { isOwner && (
                    <Button
                        onClick={() => showModal(
                            <Typography>Are you sure you want to delete this table? This action cannot be undone.</Typography>,
                            "Delete Table",
                            { acceptText: "Delete", onAccept: () => onDeleteTable?.() }
                        )}
                        sx={buttonStyle}
                        endIcon={<DeleteIcon/>}
                    >
                        Delete Table
                    </Button>
                )}
            </Grid>
        </Grid>
    )
}

const buttonStyle = {
    marginLeft: "3px",
    backgroundColor:"blue",
    color:"white",
    borderRadius:"5px",
};
