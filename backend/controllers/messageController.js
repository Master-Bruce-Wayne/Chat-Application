import { Conversation } from "../models/conversationModel.js";
import {Message} from "../models/messageModel.js"

export const sendMessage = async(req,res) => {
    try{
        const senderId = req.id;
        const receiverId = req.params.id;
        const {message} = req.body;

        let gotConversation=await Conversation.findOne({
            participants: {$all: [senderId,receiverId]},
        });

        if(!gotConversation) {
            gotConversation = await Conversation.create({
                participants:[senderId,receiverId]
            })
        };

        const msg=await Message.create({senderId,receiverId,message});
        if(msg) {
            gotConversation.messages.push(msg._id);
        }

        await gotConversation.save();

        return res.status(201).json({
            message: "Message sent successfully."
        })
    } catch(err) {
        console.log(err);
    }
}

export const getMessage = async(req,res) => {
    const receiverId=req.params.id;
    const senderId=req.id;

    // populate se ref-id ko actual msg-object se replace kardega 
    const conversation = await Conversation.findOne({
        participants: {$all: [senderId,receiverId]}
    }).populate("messages");
    // console.log(conversation);

    return res.status(200).json(conversation?.messages);

}