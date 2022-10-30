import React from 'react';
// components
import { InfoButton } from '../../../../../common/Table/Header/Buttons';
// children components
import ProvInfoPopover from '../../../../../Dialogs/Providers/ProvInfoPopover';

export default function InfoProvButton() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);

  return (
    <InfoButton setAnchorEl={setAnchorEl}>
      <ProvInfoPopover
        open={open}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </InfoButton>
  );
}
