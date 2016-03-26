var ApiResponse = function (cnf) {
	this.success = cnf.successl;
	this.extras = cnf.extras;
};
module.exports = ApiResponse;