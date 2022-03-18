/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT and Salltanera Teknologi, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/

uses("server_RemoteObject");
window.server_graph_graph = function(connection)
{
	try
	{
		this.remoteClassName = "server_graph_graph";
		window.server_graph_graph.prototype.parent.constructor.call(this, connection);
		this.className = "server_graph_graph";
		
	}catch(e)
	{
		alert("[server_graph_graph] :: constructor : " + e);
	}

}
window.server_graph_graph.extend(window.server_RemoteObject);

window.server_graph_graph.prototype.createGraph = function(sql, chartType, title, width, height)
{
	this.params.clear();
	this.params.add(sql);
	this.params.add(chartType);
	this.params.add(title);
	this.params.add(width);
	this.params.add(height);
	return this.call("createGraph");
}

