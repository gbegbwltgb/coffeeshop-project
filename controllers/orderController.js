"use strict";

const { validationResult, body } = require("express-validator");

const Order = require("../models/order");

exports.index = async (req, res, next) => {
    try {
        res.render("order", {
            title: "Кофе с собой",
            name: "order",
        });
    } catch (err) {
        console.error(err);
        return next(err);
    }
};

exports.reservation = [
    body("username")
        .trim()
        .isLength({ min: 1, max: 50 })
        .escape()
        .withMessage("Username must be 1-50 characters long"),

    body("email").trim().isEmail().withMessage("Invalid Email"),

    body("number").trim().isNumeric(),

    body("drink").trim().notEmpty(),
    body("date").trim().notEmpty(),
    body("address").trim().isString(),

    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("info", {
                title: "Информация",
                errors: errors.array(),
                message: "Не удалось сделать заказ",
            });
        }

        const {
            username,
            date,
            number,
            email,
            address,
            drink,
        } = req.body;

        try {
            await Promise.allSettled([

                Order.findOneAndUpdate(
                    {
                        username,
                        date,
                        number,
                        email,
                        address,
                        drink
                    }
                ),
            ]);

            res.render("info", {
                title: "Информация",
                message:
                    "Ожидайте доставку!",
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    },
];
