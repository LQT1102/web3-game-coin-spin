import React from "react";

//Server component
async function Foo(props: any) {
  const promise = new Promise((res: any) => {
    setTimeout(() => {
      console.log("Render ở server");
      res();
    }, 5000);
  });
  await promise;
  return <div>Foo</div>;
}

export default Foo;
