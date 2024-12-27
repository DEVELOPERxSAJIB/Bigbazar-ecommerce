const Order = require("../modals/Order");
const Product = require("../modals/Product");
const { successResponse } = require("./responseController");
const createError = require("http-errors");

/**
 * @DESC create an order
 * @ROUTE api/v1/order/create-order
 * @Method POST
 * @access protected
 */
const createOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const data = {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    };

    const order = await Order.create(data);

    successResponse(res, {
      statusCode: 200,
      message: "Order created successfully",
      payload: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Get sigle order
 * @ROUTE api/v1/order/get-single-order
 * @method GET
 * @access protected
 */
const getSingleOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("user");

    if (!order) {
      throw createError(404, "No Orders found with this id");
    }

    successResponse(res, {
      statusCode: 200,
      message: "Fetched solo order successfully",
      payload: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC get loggedin user orders
 * @ROUTE api/v1/order/my-orders
 * @Method GET
 * @access protected
 */
const myOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ user: req.user.id });

    if (!order) {
      throw createError(404, "No orders found");
    }

    successResponse(res, {
      statusCode: 200,
      message: "Fething my orders",
      payload: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Get all orders by admin
 * @ROUTE api/v1/order/all-orders
 * @method Get
 * @access protected
 */
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    successResponse(res, {
      statusCode: 200,
      message: "Fetched all orders by admin",
      payload: {
        orders,
        totalAmount,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Update order by admin
 * @ROUTE api/v1/order/admin/:id
 * @method PUT
 * @access protected
 */
const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if (order.orderStatus === "Delivered") {
      throw createError(400, "Order is already delivered");
    }

    order.orderItems.forEach(async (item) => {
      await updateProductStock(item.product, item.quantity);
    });

    order.orderStatus = status;
    order.deliveredAt = Date.now();

    await order.save();

    successResponse(res, {
      statusCode: 200,
      message: "Order was successfully updated",
      payload: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
};

async function updateProductStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

/**
 * @DESC Delete order by admin
 * @ROUTE api/v1/order/delete-order/:id
 * @method DELETE
 * @access private
 */
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existOrder = await Order.findById(id);

    if (!existOrder) {
      throw createError(404, "No order found with this id");
    }

    const order = await Order.findByIdAndDelete(id);

    successResponse(res, {
      statusCode: 200,
      message: "Order was deleted successfully",
      payload : {
        order
      }
    })

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  myOrders,
  getSingleOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
