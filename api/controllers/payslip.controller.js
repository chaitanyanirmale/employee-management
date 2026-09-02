import Employee from "../models/employee.model.js";
import Payslip from "../models/payslip.model.js";


export const createPayslip = async (req, res) => {
  try {
    const {empId, month, year, basicSalary, allowances, deductions} = req.body
    if(!empId || !month || !year || !basicSalary){
      return res.status(400).json({error: "Missing fields"})
    }
    const netSalary = Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);
    const payslip = await Payslip.create({
      empId, month: Number(month), year: Number(year), basicSalary: Number(basicSalary), allowances: Number(allowances || 0), deductions: Number(deductions || 0), netSalary,
    })
    return res.json({success: true, data: payslip})
  } catch (error) {
    return res.status(500).json({error: 'Failed'})
  }
}

export const getPayslips = async (req, res) => {
  try {
    const session = req.session;
    const isAdmin = session.role === "ADMIN";
    if(isAdmin){
      const payslips = await Payslip.find().populate('empId').sort({createdAt: -1});
      const data = payslips.map((p)=>{
        const obj = p.toObject();
        return {
          ...obj,
          id: obj._id.toString(),
          employee: obj.empId,
          empId: obj.empId?._id?.toString(),
        }
      })
      return res.json({data})
    } else {
      const employee = await Employee.findOne({userId: session.userId});
      if(!employee) return res.status(404).json({error: "Not found"});
      const payslips = await Payslip.find({empId: employee._id}).sort({createdAt: -1})
      return res.json({data: payslips})
    }
  } catch (error) {
    return res.status(500).json({error: 'Failed'})
  }
}

export const getPayslipById = async (req, res) => {
  try {
    const payslip = await Payslip.findById(req.params.id).populate('empId').lean();
    if(!payslip) return res.status(404).json({error: "Not found"});
    const result = {
      ...payslip, 
      id: payslip._id.toString(),
      employee: payslip.empId,
    }
    return res.json(result)
  } catch (error) {
    return res.status(500).json({error: 'Failed'})
  }
}