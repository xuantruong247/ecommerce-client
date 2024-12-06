import React from "react";
import imgFllow from "../../assets/imgFllow.jpg";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import ShoppingOrders from "../../components/shopping-view/orders";
import ShoppingFooter from "../../components/shopping-view/footer";

const ShoppingAccount = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src={imgFllow}
          alt="banner"
          width={"100%"}
          height={"400"}
          style={{ aspectRatio: "1600/300", objectFit: "cover" }}
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg bg-muted/5 p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
           
          </Tabs>
        </div>
      </div>
      <ShoppingFooter />
    </div>
  );
};

export default ShoppingAccount;
