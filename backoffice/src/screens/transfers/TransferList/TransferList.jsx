import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseAPI from "../../../axios/axiosConfig";
import { Icon } from "@iconify/react";
import TransferListItem from "./TransferListItem";
import VehicleSizeFilter from "../../../ui/filters/VehicleSizeFilter";
import CityFilter from "../../../ui/filters/CityFilter";
import TransferVendorFilter from "../../../ui/filters/TransferVendorFilter";
import TransferServiceFilter from "../../../ui/filters/TransferServiceFilter";
import Spinner from "../../../ui/spinner/Spinner";
import { useCurrentProject } from "../../../hooks/useCurrentProject";

const TransferList = ({ transfer_in_out = false }) => {
  const navigate = useNavigate();
  const [transfers, setTransfers] = useState([]);
  const [transfer] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { currentProject } = useCurrentProject();
  const [city, setCity] = useState(currentProject.groupLocation ?? "");
  const [vehicleCapacity, setVehicleCapacity] = useState(20);
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");

  const currentProjectIsLive = Object.keys(currentProject).length !== 0;

  useEffect(() => {
    const getTransferList = async () => {
      try {
        setIsLoading(true);
        const response = await baseAPI.get(
          `/v1/transfers?city=${city}&vehicleCapacity=${vehicleCapacity}&company=${company}`
        );
        setTransfers(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (city && vehicleCapacity && company) {
      getTransferList();
    }
  }, [city, vehicleCapacity, company, service]);

  const transferList = transfers
    .slice(0, 15)
    .map((transfer) => (
      <TransferListItem
        key={transfer._id}
        transfer={transfer}
        service={service}
      />
    ));

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
        <div className="flex flex-col w-full">
          <h1 className="text-2xl">Transfer List</h1>
          <div className="flex flex-row justify-between">
            <div className="flex-0.5">
              {currentProjectIsLive ? null : (
                <CityFilter setCity={setCity} city={city} />
              )}
              <TransferVendorFilter setCompany={setCompany} city={city} />
              <VehicleSizeFilter
                setVehicleCapacity={setVehicleCapacity}
                vehicleCapacity={vehicleCapacity}
                company={company}
              />
              {transfer_in_out === false ? (
                <TransferServiceFilter
                  company={company}
                  service={service}
                  setService={setService}
                  vehicleCapacity={vehicleCapacity}
                />
              ) : (
                setService("transfer_in_out")
              )}
            </div>
            <button
              onClick={() =>
                navigate("/app/transfer/specs", { state: { transfer } })
              }
              className="focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
            >
              Create New Transfer
            </button>
            <p className="flex flex-row items-center">
              <Icon icon="ic:baseline-swipe-left" color="#ea5933" width="40" />
              <span className="ml-2">
                Swipe list elements right to update / left to remove element
              </span>
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex-1 m-4 flex-col">
        {isLoading ? <Spinner /> : transferList}
      </div>
    </>
  );
};

export default TransferList;
