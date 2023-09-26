
import Razorpay from "razorpay";
const razorpayInstance = new Razorpay({
    key_id:"rzp_test_LGXCa6YWZ0NGjj",
    key_secret: "oRXrtmRPzBPR0FWMozhkqAfP"
}); 

export const createPayment=(req,res)=>{
    try {
        const amount = req.body.amount*100
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        }

        razorpayInstance.orders.create(options, 
            (err, order)=>{
                if(!err){
                    res.status(200).send({
                        success:true,
                        msg:'Order Created',
                        order_id:order.id,
                        amount:amount,
                        key_id:"rzp_test_LGXCa6YWZ0NGjj",
                        product_name:req.body.name,
                        description:req.body.desc,
                        contact:"9720428758",
                        name: "Arish",
                        email: "mdarish159@gmail.com"
                    });
                }
                else{
                    res.status(400).send({success:false,msg:'Something went wrong!'});
                }
            }
        );

    } catch (error) {
        console.log(error);
   
        res.status(500).json({ message: 'Internal Server Error' });
    }


}