import { verifyToken } from "../middleware/auth";
import { sign } from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

describe('Auth Middleware', () => {
  
    const mockRequest = (token) => ({
      headers: { authorization: `Bearer ${token}` },
    });
    const mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };
    const next = jest.fn();
    it('should verify a valid token', () => {
        const token = sign({ id: 1 }, process.env.JWT_SECRET);
        console.log("Generated Token:", token);
        const req = mockRequest(token);
        const res = mockResponse();
    
        verifyToken(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    
      it('should return 401 for no token', () => {
        const req = mockRequest('');
        const res = mockResponse();
    
        verifyToken(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
  });

  it('should return 401 for invalid token', () => {
    const req = mockRequest('invalidtoken');
    const res = mockResponse();

    verifyToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    });
});
