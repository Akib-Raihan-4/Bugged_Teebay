/* eslint-disable react/prop-types */
import { Container } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard";
import Loading from "../Loading";
import NoProductsToDisplay from "../NoProductsToDisplay";
import fetchTransactionRecords from "../../data/fetchTransactionRecords";

const BoughtProducts = ({ userId }) => {
 

  const {data, isLoading} = useQuery({
    queryKey: [`${userId}_BoughtProducts`],
    queryFn: () => fetchTransactionRecords(userId, "bought"),
    config: { staleTime: Infinity }
  })

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container my={"xl"} py={"xl"} size={"lg"}>
      { !data || data.length == 0 ? (<NoProductsToDisplay text={"No bought products"} />) :
      (data?.map((product)=>(
        <ProductCard key={product.id} product={product} />
      )))}
    </Container>
  );
};

export default BoughtProducts;
