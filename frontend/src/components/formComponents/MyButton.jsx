import { Button, Center } from "@mantine/core";

const MyButton = ({ text, disabled }) => {
  return (
    <Center>
      <Button
        size="sm"
        type="submit"
        uppercase
        color="violet"
        radius={"sm"}
        disabled={disabled} // Add disabled attribute
      >
        {text}
      </Button>
    </Center>
  );
};

export default MyButton;
