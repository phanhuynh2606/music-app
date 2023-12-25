

// [GET] /

import { Request, Response } from "express";

export const index = (req: Request, res : Response) =>{

    res.render("client/pages/home/index",{
        pageTitle : "Trang Chủ"
    });
}
// [GET] /login
export const login = (req: Request, res : Response) =>{

    res.render("client/pages/home/login",{
        pageTitle : "Trang đăng nhập"
    });
}

// [GET] /register
export const register = (req: Request, res : Response) =>{

    res.render("client/pages/home/register",{
        pageTitle : "Trang đăng ký"
    });
}