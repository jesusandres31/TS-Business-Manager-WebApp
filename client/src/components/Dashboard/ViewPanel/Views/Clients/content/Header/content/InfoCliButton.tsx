import React from 'react';
// components
import { InfoButton } from '../../../../../common/Table/Header/Buttons';
// children components
import CliInfoPopover from '../../../../../Dialogs/Clients/CliInfoPopover';

export default function InfoCliButton() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);

  return (
    <InfoButton setAnchorEl={setAnchorEl}>
      <CliInfoPopover
        open={open}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </InfoButton>
  );
}
