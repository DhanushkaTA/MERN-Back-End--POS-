import express from "express";
import {CustomResponse} from "../dtos/custom.response";


export const addLoginDetail = async (req :express.Request, res :any) => {
    try {

    }catch (error) {
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const getAllLoginRecodes = async (req :express.Request, res :any) => {
    try {

    }catch (error) {
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const getAllLoginRecodesByUsername = async (req :express.Request, res :any) => {
    try {

    }catch (error) {
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}


export const getLoginRecodeById = async (req :express.Request, res :any) => {
    try {

    }catch (error) {
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}

export const updateLoginRecode = async (req :express.Request, res :any) => {
    try {

    }catch (error) {
        res.status(500).send(
            new CustomResponse(500,`Error : ${error}`)
        )
    }
}