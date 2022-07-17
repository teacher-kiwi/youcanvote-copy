"use strict";
const bcrypt = require("bcrypt");
const Vote = require("../../models/Vote");

const salt = process.env.SALT;

const ctrl = {
  create: async (req, res) => {
    const { title, password } = req.body;
    const token = await bcrypt.hash(password, parseInt(salt));
    Vote.create({ title, token }, (err) => {
      if (err) res.json({ success: false, msg: "등록 실패" });
      else res.json({ success: true, msg: "등록 성공" });
    });
  },

  read: async (req, res) => {
    Vote.find({}, (_, data) => {
      res.json(data);
    }).sort({ _id: -1 });
  },

  update: {
    done: async (req, res) => {
      const { _id, token, password } = req.body;
      const match = await bcrypt.compare(password, token);
      if (match) {
        await Vote.updateOne({ _id }, { isDone: true });
        res.json({ success: true, msg: "투표를 종료하였습니다." });
      } else {
        res.json({ success: false, msg: "비밀번호가 다릅니다." });
      }
    },

    countUp: async (req, res) => {
      const { _id, type } = req.body;

      let result;
      if (type) {
        result = await Vote.updateOne({ _id, isDone: false }, { $inc: { yesCount: 1 } });
      } else {
        result = await Vote.updateOne({ _id, isDone: false }, { $inc: { noCount: 1 } });
      }

      if (result.modifiedCount) {
        if (type) res.json({ success: true, msg: "Yes UP 성공." });
        else res.json({ success: true, msg: "No UP 성공." });
      } else res.json({ success: false, msg: "종료된 투표입니다." });
    },
  },

  delete: async (req, res) => {
    const { _id, token, password } = req.body;
    const match = await bcrypt.compare(password, token);
    if (match) {
      await Vote.deleteOne({ _id });
      res.json({ success: true, msg: "투표를 삭제하였습니다." });
    } else {
      res.json({ success: false, msg: "비밀번호가 다릅니다." });
    }
  },
};

module.exports = ctrl;
