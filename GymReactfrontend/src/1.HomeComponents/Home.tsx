import GymRecords, { GymProducts } from "../Recordes";
import { useQuery } from "@tanstack/react-query";
import axiosFetch from "../AxiosFetch";
import SomeThingWrongPage from "../someThingWrongPage";
import Sket from "../UIs/Sket";
import { useEffect } from "react";
type Deadlift = {
  name: string;
  weight: string;
  date: string;
};
type pushups = {
  name: string;
  reps: string;
  date: string;
};
type RecordsProp = {
  deadlift: Deadlift[];
  pushups: pushups[];
};
type FetchingRecordsProp = {
  records: RecordsProp;
};

const Home = () => {
  const query = useQuery<FetchingRecordsProp>({
    queryKey: ["records"],
    queryFn: () => axiosFetch("/records"),
    retry:false
  });
  const { isLoading, error, refetch } = query;
  console.log("remount reftch");

  useEffect(() => {
    console.log("remount");
  }, []);
  if (isLoading) {
    return <Sket />
     
  }
  if (error) {
    return <SomeThingWrongPage func={() => refetch()} />;
  }
  return (
    <div className="min-h-screen ">
      <GymRecords />
      <GymProducts />
    </div>
  );
};

export default Home;
