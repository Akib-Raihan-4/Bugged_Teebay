/* eslint-disable react/prop-types */
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import {  DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { GrClose } from "react-icons/gr";
import { formatDate } from "../../helper/formatDate";
import { ToastContainer, toast } from "react-toastify";

const BuyOrRent = ({ product, onClose, userId }) => {
  // TODO Reusable input/form componennts
  const [rentOpened, { open: rentOpen, close: rentClose }] =
    useDisclosure(false);
  const [buyOpened, { open: buyOpen, close: buyClose }] = useDisclosure(false);

  const rentalDates = useForm({
    initialValues: {
      rentalStart: "",
      rentalEnd: "",
    },
  });

  const errorPopup = (message) => toast.error(message);

  const validateStep = () => {
    var { rentalStart, rentalEnd } = rentalDates.values;

    rentalStart = new Date(rentalStart)
    rentalEnd = new Date(rentalEnd)
  
    if (rentalStart > rentalEnd) {
      errorPopup("Rental Start should be lower than Rental End");
      return false;
    }
    return true;
  };
  

  const productCategoriesArray = product.categories.map(({ category }) => {
    return category.name;
  });

  let reshapedProduct = {
    title: product.title,
    description: product.description,
    purchase_price: product.purchase_price,
    rent_price: product.rent_price,
    rent_duration: product.rent_duration,
    categories: productCategoriesArray,
    colors: product.colors
  };

  const handleRentClick = () => {
    rentOpen();
  };
  const handleBuyClick = () => {
    buyOpen();
  };

  const handleBuyConfirm = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/buy/${userId}/${product.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: product.id,
          }),
        }
      );

      if (response.ok) {
        console.log("Product successfully purchased");
      } else {
        console.error("Failed to purchase the product");
      }

      onClose();
    } catch (error) {
      console.error("An error occurred while purchasing the product:", error);
    }
  };

  const handleRentConfirm = async () => {
    if (validateStep()) {
      try {
        const formattedRentalStart = formatDate(rentalDates.values.rentalStart);
        const formattedRentalEnd = formatDate(rentalDates.values.rentalEnd);

        const response = await fetch(
          `http://localhost:3001/api/v1/rent/${userId}/${product.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productId: product.id,
              rentalStart: formattedRentalStart,
              rentalEnd: formattedRentalEnd,
            }),
          }
        );

        if (response.ok) {
          console.log("Product successfully rented");
        } else {
          console.error("Failed to rent the product");
        }

        onClose();
      } catch (error) {
        console.error("An error occurred while renting the product:", error);
      }
    }
  };

  return (
    <Box w={"full"}>
      <Flex justify={"flex-end"} m={"lg"}>
        <ActionIcon onClick={onClose}>
          <GrClose />
        </ActionIcon>
      </Flex>
      <Box mx={"30%"} mb={"2rem"}>
        <Box mb={"2rem"}>
          <Title>{reshapedProduct.title}</Title>
          <Text>
            Categories:{" "}
            {productCategoriesArray &&
              productCategoriesArray
                .map((category) => {
                  const categoryName = category.toLowerCase();
                  return (
                    categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
                  );
                })
                .join(", ")}
          </Text>
          <Text>Color: {reshapedProduct.colors}</Text>
          <Text>Price: ${reshapedProduct.purchase_price}</Text>
          <Text>{reshapedProduct.description}</Text>
          
        </Box>
        <Group position="right">
          <Button uppercase color="violet" onClick={handleRentClick}>
            Rent
          </Button>
          <Button uppercase color="violet" onClick={handleBuyClick}>
            Buy
          </Button>
        </Group>
        <Modal opened={rentOpened} onClose={rentClose} centered padding={"xl"} zIndex={"1"} >
          <Title order={2} fw={500}>
            Rental Period{" "}
          </Title>
          <Group mb={30} mt={40} position="apart">
            <DateTimePicker
              // dropdownType="modal"
              defaultValue={new Date()}
              label="From"
              placeholder="dd/mm/yyyy"
              maw={200}
              style={{ width: '150px', height: '100px' }}
              {...rentalDates.getInputProps("rentalStart")}
            />
            <DateTimePicker
              // dropdownType="modal"
              defaultValue={new Date()}
              label="To"
              placeholder="dd/mm/yyyy"
              maw={200}
              style={{ width: '150px', height: '100px', zIndex: 100 }}
              {...rentalDates.getInputProps("rentalEnd")}
            />
          </Group>
          <Group position="right" spacing={"md"} mt={"5rem"}>
            <Button uppercase onClick={rentClose} color="red">
              Go Back
            </Button>
            <Button uppercase color="violet" onClick={handleRentConfirm}>
              Confirm Rent
            </Button>
          </Group>
        </Modal>
        <Modal opened={buyOpened} onClose={buyClose} centered padding={"xl"}>
          <Title order={2} fw={300}>
            Are you sure you want to buy this Product?
          </Title>
          <Group position="right" spacing={"lg"} mt={"5rem"}>
            <Button uppercase onClick={buyClose} color="red">
              No
            </Button>
            <Button uppercase color="violet" onClick={handleBuyConfirm}>
              Yes
            </Button>
          </Group>
        </Modal>
      </Box>
      <ToastContainer position="top-center" autoClose={1500} />
    </Box>
  );
};

export default BuyOrRent;
