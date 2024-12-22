import React from "react";

async function fetchData() {
  // Mô phỏng data fetching chậm
  await new Promise((resolve: any) => {
    // for (let index = 0; index < 5000; index++) {
    //   console.log(index);
    // }
    // resolve();
    setTimeout(resolve, 5000);
  });

  return { data: "Data from SlowDataComponent" };
}

//Server component
async function Foo(props: any) {
  await fetchData();
  return <div>Foo</div>;
}

export default Foo;
