import React from "react";
import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Card, Typography } from "@material-tailwind/react";

  const TABLE_HEAD1 = ["Admin authentication", "", ""];
  const TABLE_ROWS1 = [
    {
      admin_actions: "Users",
    },
    {
      admin_actions: "Groups",
    },
  ];

  const TABLE_HEAD2 = ["Admin actionsㅤㅤㅤ", "", ""];

  const TABLE_ROWS2 = [
    {
      admin_actions: "Manning",
    },
    {
      admin_actions: "Parestock",
    },
    {
      admin_actions: "Uniformidad",
    },
  ];

function admin() {
  return (
    <>
      <div className="flex-1">
        <div className="grid grid-cols-1 lg:pt-20 pt-10 p-4 xl:p-10">
          <div className="">  
            <h1 className="text-2xl font-semibold text-colorRoyalton hover:text-colorHover pb-10">
              Site administration
            </h1>

            <div className="p-2 flex flex-col justify-center items-center pb-20">
              <Card className="w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD1.map((head, index) => (
                        <th
                          key={`head1_${index}`}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS1.map(({ admin_actions }, index) => {
                      const isLast = index === TABLE_ROWS1.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";
                      const uniqueKey = `row1_${admin_actions}_${index}`;

                      return (
                        <tr key={uniqueKey}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {admin_actions}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              Add
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              as="a"
                              href="#"
                              variant="small"
                              color="blue-gray"
                              className="font-medium"
                            >
                              See
                            </Typography>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Card>
            </div>

            <div className="p-2 flex flex-col justify-center items-center pb-12">
              <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD2.map((head, index) => (
                        <th
                          key={`head2_${index}`}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS2.map(({ admin_actions }, index) => {
                      const isLast = index === TABLE_ROWS2.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";
                      const uniqueKey = `row2_${admin_actions}_${index}`;

                      return (
                        <tr key={uniqueKey}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {admin_actions}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              Add
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              as="a"
                              href="#"
                              variant="small"
                              color="blue-gray"
                              className="font-medium"
                            >
                              See
                            </Typography>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default admin;
