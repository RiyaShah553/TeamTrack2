const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    department_name: {
        type: String,
        required: true,
        default: "Uncategorized",
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
}
);
module.exports = mongoose.model('Department', departmentSchema);