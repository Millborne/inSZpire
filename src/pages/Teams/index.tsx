import { useState, useMemo } from "react";
import {
  CardContainer,
  PopoverMenu,
  Inputs,
  ButtonsIcon,
  Tab,
  Pagination,
} from "enterprisze-global-components";
import {
  Add,
  ExportCurve,
  Filter,
  Firstline,
  Grid2,
  SearchNormal,
} from "iconsax-reactjs";

// components
import TeamsList from "./pages/TeamsList";

// dummy data, remove later in integration
const teamsData = [
  {
    id: 1,
    name: "The Executive Team",
    employees: [
      {
        name: "John Mark Pangilinan",
        position: "Chief People and Culture Officer",
        avatar: "https://i.pravatar.cc/100?img=32",
      },
      {
        name: "Sarah Johnson",
        position: "Chief Executive Officer",
        avatar: "https://i.pravatar.cc/100?img=1",
      },
      {
        name: "Michael Chen",
        position: "Chief Technology Officer",
        avatar: "https://i.pravatar.cc/100?img=2",
      },
      {
        name: "Emily Rodriguez",
        position: "Chief Financial Officer",
        avatar: "https://i.pravatar.cc/100?img=3",
      },
      {
        name: "David Kim",
        position: "Chief Marketing Officer",
        avatar: "https://i.pravatar.cc/100?img=4",
      },
      {
        name: "Lisa Thompson",
        position: "Chief Operations Officer",
        avatar: "https://i.pravatar.cc/100?img=5",
      },
      {
        name: "Robert Wilson",
        position: "Chief Legal Officer",
        avatar: "https://i.pravatar.cc/100?img=6",
      },
      {
        name: "Jennifer Lee",
        position: "Chief Strategy Officer",
        avatar: "https://i.pravatar.cc/100?img=7",
      },
    ],
  },
  {
    id: 2,
    name: "Development Team",
    employees: [
      {
        name: "Alex Martinez",
        position: "Senior Software Engineer",
        avatar: "https://i.pravatar.cc/100?img=8",
      },
      {
        name: "Priya Patel",
        position: "Frontend Developer",
        avatar: "https://i.pravatar.cc/100?img=9",
      },
      {
        name: "Carlos Rodriguez",
        position: "Backend Developer",
        avatar: "https://i.pravatar.cc/100?img=10",
      },
      {
        name: "Sophie Anderson",
        position: "Full Stack Developer",
        avatar: "https://i.pravatar.cc/100?img=11",
      },
      {
        name: "James Wilson",
        position: "DevOps Engineer",
        avatar: "https://i.pravatar.cc/100?img=12",
      },
      {
        name: "Maria Garcia",
        position: "QA Engineer",
        avatar: "https://i.pravatar.cc/100?img=13",
      },
      {
        name: "Kevin O'Connor",
        position: "Mobile Developer",
        avatar: "https://i.pravatar.cc/100?img=14",
      },
      {
        name: "Anna Kowalski",
        position: "UI/UX Designer",
        avatar: "https://i.pravatar.cc/100?img=15",
      },
      {
        name: "Tom Brown",
        position: "Data Engineer",
        avatar: "https://i.pravatar.cc/100?img=16",
      },
      {
        name: "Rachel Green",
        position: "Product Manager",
        avatar: "https://i.pravatar.cc/100?img=17",
      },
    ],
  },
  {
    id: 3,
    name: "Marketing Team",
    employees: [
      {
        name: "Amanda Foster",
        position: "Marketing Director",
        avatar: "https://i.pravatar.cc/100?img=18",
      },
      {
        name: "Ryan Cooper",
        position: "Digital Marketing Specialist",
        avatar: "https://i.pravatar.cc/100?img=19",
      },
      {
        name: "Nina Patel",
        position: "Content Strategist",
        avatar: "https://i.pravatar.cc/100?img=20",
      },
      {
        name: "Chris Taylor",
        position: "SEO Specialist",
        avatar: "https://i.pravatar.cc/100?img=21",
      },
      {
        name: "Jessica Wong",
        position: "Social Media Manager",
        avatar: "https://i.pravatar.cc/100?img=22",
      },
      {
        name: "Daniel Lewis",
        position: "Brand Manager",
        avatar: "https://i.pravatar.cc/100?img=23",
      },
    ],
  },
  {
    id: 4,
    name: "Sales Team",
    employees: [
      {
        name: "Mark Davis",
        position: "Sales Director",
        avatar: "https://i.pravatar.cc/100?img=24",
      },
      {
        name: "Laura Smith",
        position: "Senior Sales Representative",
        avatar: "https://i.pravatar.cc/100?img=25",
      },
      {
        name: "Jason Miller",
        position: "Account Executive",
        avatar: "https://i.pravatar.cc/100?img=26",
      },
      {
        name: "Stephanie White",
        position: "Sales Development Representative",
        avatar: "https://i.pravatar.cc/100?img=27",
      },
      {
        name: "Brian Johnson",
        position: "Regional Sales Manager",
        avatar: "https://i.pravatar.cc/100?img=28",
      },
      {
        name: "Melissa Clark",
        position: "Customer Success Manager",
        avatar: "https://i.pravatar.cc/100?img=29",
      },
      {
        name: "Andrew Moore",
        position: "Sales Operations Manager",
        avatar: "https://i.pravatar.cc/100?img=30",
      },
      {
        name: "Katherine Hall",
        position: "Business Development Representative",
        avatar: "https://i.pravatar.cc/100?img=31",
      },
    ],
  },
];

const Teams = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewType, setViewType] = useState<"card" | "table">("card");
  const teamsPerPage = 3;

  // Calculate paginated teams
  const paginatedTeams = useMemo(() => {
    const startIndex = (currentPage - 1) * teamsPerPage;
    const endIndex = startIndex + teamsPerPage;
    return teamsData.slice(startIndex, endIndex);
  }, [currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(teamsData.length / teamsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col h-full">
      <CardContainer
        content={
          <div className="flex flex-col gap-[20px] h-full">
            <section className="flex gap-[12px] items-center ">
              <h3 className="text-h3">Teams</h3>
              <div className="flex-1">
                <PopoverMenu
                  size="small"
                  items={[
                    {
                      label: "Add Team",
                      icon: <Add />,
                      onClick: () => {},
                    },
                    {
                      label: "Export",
                      icon: <ExportCurve />,
                      onClick: () => {},
                    },
                  ]}
                />
              </div>
            </section>
            <section className="flex flex-wrap justify-end sm:justify-between gap-[12px]  items-center w-full ">
              <div className="flex flex-row flex-1 gap-[12px] w-fit">
                <div className="w-full max-w-[335px] min-w-[150px] ">
                  <Inputs
                    placeholder="Search by Team Name or Employee Name"
                    icon={SearchNormal}
                    // TODO: Backend Integration - Add search functionality
                    // onChange={(value) => handleSearch(value)}
                  />
                </div>
                <ButtonsIcon
                  icon={<Filter />}
                  size="medium"
                  variant="ghost"
                  onClick={() => {}}
                />
              </div>
              <div className="flex w-fit">
                <Tab
                  type="left"
                  active={viewType === "card"}
                  icon={<Grid2 />}
                  isFirst
                  onClick={() => setViewType("card")}
                />
                <Tab
                  type="right"
                  active={viewType === "table"}
                  icon={<Firstline />}
                  onClick={() => setViewType("table")}
                />
              </div>
            </section>
            <TeamsList teams={paginatedTeams} viewType={viewType} />
            {totalPages > 1 && (
              <section className="flex justify-end">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onChange={handlePageChange}
                />
              </section>
            )}
          </div>
        }
      />
    </div>
  );
};

export default Teams;
