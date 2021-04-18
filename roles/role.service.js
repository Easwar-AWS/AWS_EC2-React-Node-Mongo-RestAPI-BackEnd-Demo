const db = require('_helpers/db');
const Role = db.Role;

module.exports = {
    create,
    getAll,
    getAllFilteredDatas,
    getById,
    bulkStatusUpdate,    
    update,
    bulkDelete,
    delete: _delete    
};

async function create(roleBodyData) {
    // validate
    if (await Role.findOne({ roleName: roleBodyData.roleName })) {
        throw new Error('Role Name "' + roleBodyData.roleName + '" is already exists');
    } 

    const role = new Role(roleBodyData);
   
    // save role
    await role.save();

    return {role};
}

async function getAll() {
    const roles = await Role.find();
    return {roles};
}

async function getAllFilteredDatas(filterParams) {    
    console.log("Req Filter Queries",filterParams);   
    const sortOrder = filterParams.queryParams.sortOrder === 'asc' ? 1 : -1;
    const sortField = filterParams.queryParams.sortField;
    const pageNumber = filterParams.queryParams.pageNumber;
    const pageSize = filterParams.queryParams.pageSize;
    
    console.log("sort Order",sortOrder);
   
    const roleLength = await Role.find({});

    const roles = await Role.find({})
                                    .sort({[sortField]: sortOrder})
                                    .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * pageSize ) : 0 )
                                    .limit( pageSize );
                                    
    console.log("Roles Len", roles.length);
    return {roles, totalCount: roleLength.length};
}

async function getById(id) {
    const role = await Role.findById(id);

    // validate
    if (!role) throw 'Role not found';
    return {role};
}

async function bulkStatusUpdate(bodyData) {
    bodyData.ids.map((id) => {
         Role.findOneAndUpdate({_id:id}, {$set: {roleStatus: bodyData.roleStatus}}, {new: true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
        
            console.log("doc",doc);
        });
    });

    return "Bulk Data Updated Successfully";
}

async function update(id, roleParamData) {
    const role = await Role.findById(id);

    // copy roleParamData properties to Role
    Object.assign(role, roleParamData);

    // update role
    await role.save();

    return {role};
}

async function bulkDelete(bodyData) {
    bodyData.ids.map((id) => {
         Role.findOneAndDelete({_id:id}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
        
            console.log("doc",doc);
        });
    });

    return "Bulk Data Deleted Successfully";
}

async function _delete(id) {
    const role = await Role.findById(id);

    // validate role
    if (!role) throw 'Role not found';

    // remove role
    await Role.findByIdAndRemove(id);

    return "Role Deleted Successfully";
}