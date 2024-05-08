import { Button, Center } from "@mantine/core";
import PropTypes from 'prop-types';

const MyButton = ({ text, disabled }) => {
  return (
    <Center>
      <Button
        size="sm"
        type="submit"
        uppercase
        color="violet"
        radius={"sm"}
        disabled={disabled}
      >
        {text}
      </Button>
    </Center>
  );
};

MyButton.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default MyButton;
