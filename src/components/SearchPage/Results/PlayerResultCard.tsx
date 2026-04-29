import React from 'react';
import { SearchResultItem } from '@/types/search';
import BaseSearchResultCard, { BaseSearchResultCardProps } from './BaseSearchResultCard';
import { Tag } from "@/types/tag";
import {ProfilePic} from "@/components/shared/ProfilePic";

interface PlayerResultCardProps extends BaseSearchResultCardProps {
  result: SearchResultItem & { type: 'player' }
  tags: Tag[];
}

/**
 * Component for displaying player search results
 */
const PlayerResultCard: React.FC<PlayerResultCardProps> = ({ 
  result,
  onClick,
  tags
}) => {
  return (
    <BaseSearchResultCard
        result={result}
        onClick={onClick}
        icon={
          <ProfilePic username={result.title} profilePicUrl={result.imageUrl} />
        }
        tags={tags}>
      {/* No additional content needed after removing join date */}
    </BaseSearchResultCard>
  );
};

export default PlayerResultCard;