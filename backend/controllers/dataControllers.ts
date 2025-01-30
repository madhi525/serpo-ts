import { Request, Response } from 'express';
import PmLink from '../models/pmLink';

// Create New PM Link
export const createPmLink = async (req: Request, res: Response) => {
  try {
    const newPmLink = new PmLink(req.body);
    const savedPmLink = await newPmLink.save();
    res.status(201).json({
      status: 'success',
      data: savedPmLink
    });
  } catch (err: any) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get All PM Links
export const getAllPmLinks = async (req: Request, res: Response) => {
  try {
    const pmLinks = await PmLink.find().sort({ _id: -1}).limit(100);
    res.status(200).json({
      status: 'success',
      results: pmLinks.length,
      data: pmLinks
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get Single PM Link by ID
export const getPmLinkById = async (req: Request, res: Response) => {
  try {
    const pmLink = await PmLink.findById(req.params.id);
    if (!pmLink) {
      return res.status(404).json({
        status: 'fail',
        message: 'PM Link not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: pmLink
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Update PM Link
export const updatePmLink = async (req: Request, res: Response) => {
  try {
    const updatedPmLink = await PmLink.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedPmLink) {
      return res.status(404).json({
        status: 'fail',
        message: 'PM Link not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: updatedPmLink
    });
  } catch (err: any) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Delete PM Link
export const deletePmLink = async (req: Request, res: Response) => {
  try {
    const deletedPmLink = await PmLink.findByIdAndDelete(req.params.id);
    
    if (!deletedPmLink) {
      return res.status(404).json({
        status: 'fail',
        message: 'PM Link not found'
      });
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err: any) {
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
};