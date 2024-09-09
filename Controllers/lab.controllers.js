import Lab from "../Models/labs.model.js";
import bcrypt from 'bcryptjs';

const createLab = async (req, res) => {
    const lab = new Lab({
        labName: req.body.labName,
        contact: {
        firstName: req.body.contact.firstName,
        lastName: req.body.contact.lastName,
        email: req.body.contact.email,
        phone: req.body.contact.phone,
        password: bcrypt.hashSync(req.body.contact.password, 8),
        countryCode: req.body.contact.countryCode,
        phone1: req.body.contact.phone1,
        phone2: req.body.contact.phone2,
        phone3: req.body.contact.phone3
        },
        address: {
        address1: req.body.address.address1,
        address2: req.body.address.address2,
        zip: req.body.address.zip,
        country: req.body.address.country,
        state: req.body.address.state,
        city: req.body.address.city
        },
        coupon: req.body.coupon,
        scanners: {
        dentalWings: req.body.scanners.dentalWings,
        threeShape: req.body.scanners.threeShape,
        iTeroSTL: req.body.scanners.iTeroSTL,
        sironaInEOSSTL: req.body.scanners.sironaInEOSSTL,
        other: req.body.scanners.other
        },
        users: req.body.users
    });
    try {
        const newLab = await lab.save();
        res.status(201).json(newLab);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

    const labLogin = async (req, res) => {
        try {
            const lab = await Lab.findOne
            ({
                'contact.email': req.body.email
            });
            if (lab && bcrypt.compareSync(req.body.password, lab.contact.password)) {
                res.status(200).json(lab);
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
        }


const getLabs = async (req, res) => {
    try {
        const labs = await Lab.find();
        res.status(200).json(labs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    }

const getLab = async (req, res) => {
    try {
        const lab = await Lab.findById(req.params.id);
        res.status(200).json(lab);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    }

    const updatePassword = async (req, res) => {
        try {
            const lab = await Lab.findById(req.params.id);
            lab.contact.password = bcrypt.hashSync(req.body.password, 8);
            const updatedLab = await lab.save();
            res.status(200).json(updatedLab);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
        }


const updateLab = async (req, res) => {
    try {
        const lab = await Lab.findById(req.params.id);
        lab.labName = req.body.labName;
        lab.contact = {
        firstName: req.body.contact.firstName,
        lastName: req.body.contact.lastName,
        email: req.body.contact.email,
        phone: req.body.contact.phone,
        countryCode: req.body.contact.countryCode,
        phone1: req.body.contact.phone1,
        phone2: req.body.contact.phone2,
        phone3: req.body.contact.phone3
        };
        lab.address = {
        address1: req.body.address.address1,
        address2: req.body.address.address2,
        zip: req.body.address.zip,
        country: req.body.address.country,
        state: req.body.address.state,
        city: req.body.address.city
        };
        lab.coupon = req.body.coupon;
        lab.scanners = {
        dentalWings: req.body.scanners.dentalWings,
        threeShape: req.body.scanners.threeShape,
        iTeroSTL: req.body.scanners.iTeroSTL,
        sironaInEOSSTL: req.body.scanners.sironaInEOSSTL,
        other: req.body.scanners.other
        };
        lab.users = req.body.users;
        const updatedLab = await lab.save();
        res.status(200).json(updatedLab);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    }

    const addUser = async (req, res) => {
        try {
            const lab = await Lab.findById(req.params.id);
            lab.users.push(req.body);
            const updatedLab = await lab.save();
            res.status(200).json(updatedLab);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
        }

    const deleteUser = async (req, res) => {
        try {
            const lab = await Lab.findById(req.params.id);
            lab.users.pull(req.body);
            const updatedLab = await lab.save();
            res.status(200).json(updatedLab);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
        }

const deleteLab = async (req, res) => {
    try {
        const lab = await Lab.findById(req.params.id);
        await lab.remove();
        res.status(200).json({ message: "Lab deleted" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    }

export { createLab, getLabs, getLab, updateLab, deleteLab, addUser, deleteUser, labLogin, updatePassword };