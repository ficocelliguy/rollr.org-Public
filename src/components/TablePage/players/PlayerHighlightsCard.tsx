"use client";

import Button from "@mui/material/Button";
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import {ProfilePic} from "@/components/shared/ProfilePic";
import {renderTagsFromIds} from "@/components/shared/TagComponents";
import type { Player } from "@/types/player";
import type { Tag } from "@/types/tag";

export type PlayerHighlightsCardProps = {
    addToTable?: (player: Player) => void;
    allTags: Tag[];
    canChangeDungeonMaster: boolean;
    canEdit: boolean;
    handleAssignToDungeonMaster: (player: Player) => void;
    isWaitList?: boolean;
    player: Player;
    removeFromTable: (player: Player) => void;
}

export const PlayerHighlightsCard = function(props: PlayerHighlightsCardProps) {
    const {
        allTags,
        canChangeDungeonMaster,
        canEdit,
        handleAssignToDungeonMaster,
        isWaitList,
        player,
        removeFromTable
    } = props;

    return (
        <Card elevation={3} sx={{ backgroundColor: canEdit ? "#fffbea" : "#f5f9fa", marginBottom:"6px" }}>
            <CardContent>
                <Grid container spacing={2} direction="column">
                    <Grid container direction="row">
                        <Grid>
                            <ProfilePic username={player.username} profilePicUrl={player.imageUrl} />
                        </Grid>
                        <Grid>
                            <Typography variant="h5">{player.username}</Typography>
                        </Grid>
                    </Grid>
                    <Grid>{renderTagsFromIds(player.tags, allTags)}</Grid>
                </Grid>
                {canEdit && (
                    <Grid>
                        <Button onClick={() => removeFromTable(player)}>
                            { isWaitList ? <p>Deny Player</p> : <p>Remove Player</p> }
                        </Button>
                        {canChangeDungeonMaster && (
                            <Button onClick={() => {
                                handleAssignToDungeonMaster(player);
                                removeFromTable(player);
                            }}>
                                <p>Assign to DungeonMaster</p>
                            </Button>
                        )}
                    </Grid>
                )}
            </CardContent>
        </Card>
    )
}

export const DMHighlightsCard = function({canEdit, player, allTags}:{canEdit: boolean, player: Player, allTags:Tag[]}) {
    return (
        <Card elevation={3} sx={{ backgroundColor: "#f5f9fa", marginBottom:"6px" }}>
            <CardHeader slotProps={{title: { variant: "h4"}}} title="Game Master"/>
            <CardContent sx={{ backgroundColor: canEdit ? '#fffbea' : 'inherit' }}>
                <Grid container spacing={2} direction="column">
                    <Grid container direction="row">
                        <Grid>
                            <ProfilePic username={player.username} profilePicUrl={player.imageUrl} />
                        </Grid>
                        <Grid>
                            <Typography variant="h5">{player.username}</Typography>
                        </Grid>
                    </Grid>
                    <Grid>{renderTagsFromIds(player.tags, allTags)}</Grid>
                    <Typography>{player.description}</Typography>
                </Grid>
            </CardContent>
        </Card>
    )
}
