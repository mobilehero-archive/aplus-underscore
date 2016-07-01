"use strict";
/***
 *                          __     _  __       __                     
 *       ____ ___   ____   / /_   (_)/ /___   / /_   ___   _____ ____ 
 *      / __ `__ \ / __ \ / __ \ / // // _ \ / __ \ / _ \ / ___// __ \ 
 *     / / / / / // /_/ // /_/ // // //  __// / / //  __// /   / /_/ / 
 *    /_/ /_/ /_/ \____//_.___//_//_/ \___//_/ /_/ \___//_/    \____/ 
 *                                                                    
 *                  mobile solutions for everyday heroes
 *                                                                    
 * @file 
 * Alloy+ plugin for fixing underscore.js usage issues in Alloy
 * 
 * @module 
 * @aplus/underscore 
 * 
 * @author 
 * Brenton House <brenton.house@gmail.com>
 * 
 * @copyright
 * Copyright (c) 2016 by Superhero Studios Incorporated.  All Rights Reserved.
 *      
 * @license
 * Licensed under the terms of the MIT License (MIT)
 * Please see the LICENSE.md included with this distribution for details.
 * 
 */

var path = require("path");
var _ = require('lodash');
var fs = require('fs');
var logger;

/**
 * Remove invalid underscore calls from a file
 * 
 * @param {string} fullpath
 */
function replace_content(fullpath) {
	var source = fs.readFileSync(fullpath, 'utf8');
	var regex = /(require\s*\(\s*['"]alloy\/underscore['"]\s*\))._/g
	var test = regex.test(source);
	if(test) {
		logger.trace("Fixing file: " + fullpath);
		source = source.replace(regex, "$1");
		fs.writeFileSync(fullpath, source);
	}
}

/**
 * Fix certain usages of underscore.js in Alloy source code
 * 
 * @param {object} params
 */
function plugin(params) {
	logger = params.logger;
	params.dirname = params.dirname ? _.template(params.dirname)(params) : params.event.dir.resourcesPlatform;
	logger.trace("fixing underscore in directory: " + params.dirname);

	replace_content(path.join(params.dirname, "alloy.js"))
	replace_content(path.join(params.dirname, "alloy", "sync", "properties.js"))
	replace_content(path.join(params.dirname, "alloy", "sync", "sql.js"))
}

module.exports = plugin;