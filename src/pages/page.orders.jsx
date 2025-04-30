import { getOrders } from "../services/service.order";
import { useEffect, useState } from "react";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orders = await getOrders();
                setOrders(orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);
    return (
        <div className="container m-5">
            <table className="border-collapse border border-gray-400" style={{ width: "100%" }}>
                <thead>
                    <tr className="table-header row text-center align-items-center justify-content-center ">
                        <th className="border border-gray-300">Order ID</th>
                        <th className="border border-gray-300">Customer Name</th>
                        <th className="border border-gray-300">Total Amount</th>
                        <th className="border border-gray-300">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id} className="table-row row text-center align-items-center justify-content-center">
                            <td className="border border-gray-300">{order._id}</td>
                            <td className="border border-gray-300">{order.order_info_customer.giveName} {order.order_info_customer.surname}</td>
                            <td className="border border-gray-300">{order.order_info_customer.itemTotal}</td>
                            <td className="border border-gray-300">{order.order_status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Orders;