const Sale = require("../models/Sale");
const Setting = require("../models/Setting");

const getInvoice = async (req, res) => {

  try {

    const sale = await Sale.findById(req.params.saleId)
      .populate("product")
      .populate("customer");

    if (!sale) {

      return res.status(404).json({

        success: false,

        message: "Invoice not found"

      });

    }

    // ===========================
    // GET COMPANY SETTINGS
    // ===========================

    let settings = await Setting.findOne();

    if (!settings) {

      settings = await Setting.create({});

    }

    // ===========================
    // CALCULATIONS
    // ===========================

    const subtotal = sale.totalAmount;

    const gstRate =
      sale.product?.gst ||
      settings.defaultGST ||
      0;

    const gstAmount =
      (subtotal * gstRate) / 100;

    const grandTotal =
      subtotal + gstAmount;

    // ===========================
    // RESPONSE
    // ===========================

    res.json({

      success: true,

      invoice: {

        shop: {

          name: settings.shopName,

          ownerName:
            settings.ownerName,

          address:
            settings.address,

          city:
            settings.city,

          state:
            settings.state,

          country:
            settings.country,

          pincode:
            settings.pincode,

          phone:
            settings.phone,

          alternatePhone:
            settings.alternatePhone,

          email:
            settings.email,

          website:
            settings.website,

          gst:
            settings.gstNumber,

          logo:
            settings.logo,

          signature:
            settings.signature,

          bankName:
            settings.bankName,

          accountHolder:
            settings.accountHolderName,

          accountNumber:
            settings.accountNumber,

          ifsc:
            settings.ifscCode,

          branch:
            settings.branchName,

          upiId:
            settings.upiId,

          footer:
            settings.invoiceFooter,

          terms:
            settings.termsAndConditions,

          currency:
            settings.currency,

          invoicePrefix:
            settings.invoicePrefix

        },

        invoiceNumber:
          sale.invoiceNumber,

        invoiceDate:
          sale.createdAt,

        customer: {

          name:
            sale.customer?.name ||
            sale.customerName,

          phone:
            sale.customer?.phone || "",

          email:
            sale.customer?.email || "",

          gstNumber:
            sale.customer?.gstNumber || "",

          address:
            sale.customer?.address || ""

        },

        product: {

          name:
            sale.product?.name,

          quantity:
            sale.quantity,

          price:
            sale.sellingPrice,

          gst:
            gstRate

        },

        subtotal,

        gstAmount,

        grandTotal,

        profit:
          sale.profit

      }

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }
};

module.exports = {

  getInvoice

};