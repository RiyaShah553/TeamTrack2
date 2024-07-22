const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: Date,
        require: true,
    },
    job_title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    contact_no: {
        type: Number,
        required: true,

    },
    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        // required: true,
    },
    department_name: {
        type: String,
        required: true,
        default: "Uncategorized",
    }
}, {
    timestamps: true,
}
);

module.exports = mongoose.model('Employee', employeeSchema);