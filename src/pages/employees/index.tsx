import AvailabilityFilter from "@/components/Filters/AvailabilityFilter/AvailabilityFilter";
import SearchByString from "@/components/Search/SearchByString";
import UsersList from "@/components/UsersList/UsersList";

const EmployeesPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <SearchByString />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,200px),1fr] gap-10">
        <AvailabilityFilter />
        <UsersList />
      </div>
    </div>
  );
};

export default EmployeesPage;
