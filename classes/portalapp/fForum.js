//***********************************************************************************************
//*	Copyright (c) 2009 SAI
//*	 All rights reserved. This program and the accompanying materials
//*	 are made available under the terms of the Common Public License v1.0
//*	 which accompanies this distribution, and is available at
//*	Contributors 
//* 			SAI, PT											
//***********************************************************************************************
window.portalapp_fForum = function(owner){
	try{
		if (owner)
		{
			window.portalapp_fForum.prototype.parent.constructor.call(this, owner);
			window.portalapp_fForum.prototype.parent.setBorder.call(this, 0);		
			window.portalapp_fForum.prototype.parent.setColor.call(this, "");		
			this.className = "portalapp_fForum";											
			this.initComponent();		
			this.title = "Unit Pinjaman";
		}
	}catch(e)
	{
		systemAPI.alert("[portalapp_fForum]::contruct:"+e,"");
	}
};
window.portalapp_fForum.extend(window.portalui_panel);
window.portalapp_fForum.implement({
	initComponent: function(){
		try{			
			uses("util_standar");			
			this.standarLib = new util_standar();
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.img = new portalui_image(this);													
			this.img.setBound(0,0,this.app._mainForm.tab.width-2,100);								
			this.img.setImage("image/themes/"+system.getThemes()+"/logo_depan_kopeg.png");
			
			var top = (document.all ? 104 : 102);
			this.tbmenu = new portalui_FEtabPanel(this);
			this.tbmenu.setBound(10,top,260,410);					
			this.tbmenu.setBgColor("");	
			this.tbmenu.addPage(["Kategori","Pencarian"]);						
			this.tbmenu.setBackground("#ffffff");
			this.tbmenu.onTabChange.set(this,"doTabChange");
			this.tbmenu.childPage[0].getCanvas().style.background="url(image/themes/"+system.getThemes()+"/back_tab.gif)";
			this.tbmenu.onChildItemsClick.set(this,"doChildItemsClick");
			uses("portalui_treeView;portalui_treeNode;portalui_saiCB;portalui_saiLabelEdit");
			uses("portalui_button;portalui_pager;server_util_mail;util_file");
			this.treev = new portalui_treeView(this.tbmenu.childPage[0]);
			this.treev.setBound(1,1,this.tbmenu.width -2,this.tbmenu.height - 22);
			this.treev.childLength = 260;
			this.treev.onDblClick.set(this, "treeClick");
			
			this.cbKategori = new portalui_saiCB(this.tbmenu.childPage[1]);
			this.cbKategori.setBound(5,10,200,20);
			this.cbKategori.setItemHeight(10);
			this.cbKategori.setCaption("Kategori");
			this.cbKategori.addItem(0,"All");
			this.cbKategori.setLength(100);
			
			this.search = new portalui_saiLabelEdit(this.tbmenu.childPage[1]);
			this.search.setBound(5,35,200,20);
			this.search.setCaption("Cari");
			this.search.setText("");
			this.search.setReadOnly(false);
			this.search.onKeyDown.set(this, "keyDown");
			
			this.btnCari = new portalui_button(this.tbmenu.childPage[1]);
			this.btnCari.setBound(130,65,80,18);
			this.btnCari.setIcon("url(icon/"+system.getThemes()+"/find2.png)");
			this.btnCari.setCaption("Search");
			this.btnCari.onClick.set(this,"doSearch");
			
			this.pDetail = new portalui_panel(this);
			this.pDetail.setBound(280, top,this.app._mainForm.tab.width - 300,415);
			this.pDetail.setBorder(0);
			this.pDetail.getCanvas().style.background = "";
			this.pDetail.setScroll(true);			
			
			this.childBlock = new portalui_panel(this);
			this.childBlock.setBound(280,top,this.app._mainForm.tab.width - 290,435);
			this.childBlock.setBorder(0);
			this.childBlock.setColor("#FFF");
			this.childBlock.getCanvas().style.zIndex = 999999;
			this.childBlock.hide();
			
			this.load = new portalui_image(this.childBlock);
			this.load.setBound(this.childBlock.width / 2 - 15,this.childBlock.height / 2 - 30,31,31);
			this.load.setImage("image/gridload.gif");
			
			this.pgr = new portalui_pager(this);
			this.pgr.setBound(280,top+413,this.app._mainForm.tab.width - 302,18);			
			this.pgr.onPager.set(this,"doPager");
			this.pgr.hide();
			this.path = [];
			this.smileCode=[];
			this.smileGbr=[];
			var data = this.dbLib.getDataProvider("select * from portal_icon ");
			eval("data = "+data+";");
			if (typeof(data) == "object"){
				if (data.rs.rows[0] != undefined){
					for (var i in data.objList){
						this.smileCode[i]=data.rs.rows[i].code;
						this.smileGbr[data.rs.rows[i].code]=data.rs.rows[i].gambar;
					}
				}
			}else throw(data);			
			this.mail = new server_util_mail();
			this.file = new util_file();
			this.file.addListener(this);					
			this.showForum();
			this.dbLib.getDataProviderA("select * from portal_forum_kategori where kode_lokasi = '"+this.app._lokasi+"' order by rowindex");
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChildItemsClick: function(sender,id,item){
		try{			
			
		}catch(e){
			systemAPI.alert("fUsaha::doChildItemsClick : "+e);
		}
	},
	showForum: function(){
		try{
			this.addPath("Home",0,0);
			if (this.panel!= undefined) this.panel.free();
			this.panel = new portalui_panel(this.pDetail);
			this.panel.setBound(0,0,this.pDetail.width-2,415);
			this.panel.setBorder(0);
			this.panel.getCanvas().style.background = "";
			this.panel.setScroll(true);			
			var bglefttop = new portalui_image(this.panel);
			bglefttop.setBound(0,0,5,25);					
			bglefttop.setImage("image/themes/dynpro/bglefttop.png");
			var bgcentertop = new portalui_panel(this.panel);
			bgcentertop.setBound(5,0,this.panel.width-10,25);			
			bgcentertop.setBorder(0);
			bgcentertop.getCanvas().style.background = "url(image/themes/dynpro/bgcentertop.png)";
			var bgrighttop = new portalui_image(this.panel);
			bgrighttop.setBound(this.panel.width-5,0,5,25);								
			bgrighttop.setImage("image/themes/dynpro/bgrighttop.png");
			var dat = new portalui_control(this.panel);
			dat.setBound(6,7,this.panel.width-10,20);
			var canvas = dat.getCanvas();			
			var html="<table width='"+(this.panel.width-11)+"' border='0' cellpadding='0' cellspacing='0'>"+
						  "<tr style='font-size:11px;color:#FFFFFF;'>"+
						    "<td width='"+(this.panel.width-320)+"'>FORUM</td>"+
						    "<td width='70' align='center'>TOPICS</td>"+
						    "<td width='70' align='center'>POSTS</td>"+
							"<td width='180' align='center'>LAST POST</td>"+
						  "</tr>"+
						"</table>";
			canvas.innerHTML=html;
			var content = new portalui_panel(this.panel);
			content.setBound(0,25,this.panel.width,25);
			content.setBorder(0);
			content.getCanvas().style.background = "#12a3eb";
			var data = this.dbLib.getDataProvider("select a.nama,count(b.kode_pesan) as jmltopik,a.jml_post,a.nik_user,a.kode_kategori, "+
				"(select max(date_format(tanggal,'%d/%m/%Y, %h:%i %p')) from portal_forum_pesan where kode_kategori=a.kode_kategori and kode_lokasi='"+this.app._kodeLokasi+"') as tgljam "+
				"from portal_forum_kategori a left outer join portal_forum_pesan b "+
				"on a.kode_kategori=b.kode_kategori and b.status='P' "+
				"where a.tipe='Posting' and a.kode_lokasi='"+this.app._kodeLokasi+"' "+
				"group by a.kode_kategori order by b.tanggal desc ");
			eval("data = "+data+";");
			if (typeof(data) == "object"){
				var ix=1;
				var line;
				for (var i in data.rs.rows){					
					line = data.rs.rows[i];
					content.setHeight(41*ix);
					var pfrm = new portalui_panel(content);
					pfrm.setBound(5,41*i,this.panel.width-10,40);					
					pfrm.setBorder(1);
					if (i%2 == 1)
						pfrm.setColor("#ecf3f7");
					else
						pfrm.setColor("#e1ebf2");
					var dat2 = new portalui_control(pfrm);
					dat2.setBound(1,12,pfrm.width,20);
					var canvas2 = dat2.getCanvas();
					canvas2.style.overflow="auto";
					var html2="<table width='"+(pfrm.width-1)+"' border='0' cellpadding='0' cellspacing='0'>"+
								  "<tr style='font-size:12px;color:#655d9f;'>"+
								    "<td width='"+(pfrm.width-311)+"'></td>"+
								    "<td width='70' align='center'>"+line.jmltopik+"</td>"+
								    "<td width='70' align='center'>"+line.jml_post+"</td>"+
									"<td width='180'>&nbsp;</td>"+
								  "</tr>"+
								"</table>";
					canvas2.innerHTML=html2;
					var buletfrm = new portalui_image(pfrm);
					buletfrm.setBound(10,7,27,27);		
					buletfrm.setImage("image/themes/dynpro/bforum.png");
					var nmfrm = new portalui_label(pfrm);
					nmfrm.setBound(47,11,150,20);
					nmfrm.setCaption(line.nama);
					nmfrm.fnt.setSize(10);
					nmfrm.setColor("#0000ff");
					nmfrm.setTag(line.kode_kategori);
					nmfrm.setLineText();
					nmfrm.setData(0);
					nmfrm.getCanvas().style.cursor="pointer";
					nmfrm.onClick.set(this,"doClickForum");
					var p1 = new portalui_panel(pfrm);
					p1.setBound(pfrm.width-320,3,1,34);					
					p1.setBorder(0);
					p1.getCanvas().style.background = "#FFFFFF";
					var p2 = new portalui_panel(pfrm);
					p2.setBound(pfrm.width-250,3,1,34);					
					p2.setBorder(0);
					p2.getCanvas().style.background = "#FFFFFF";
					var p3 = new portalui_panel(pfrm);
					p3.setBound(pfrm.width-180,3,1,34);					
					p3.setBorder(0);
					p3.getCanvas().style.background = "#FFFFFF";
					if (line.jml_post!=0){
						var last = new portalui_label(pfrm);
						last.setBound(pfrm.width-170,6,150,50);
						last.setCaption("by <span style='color:#aa0000;'>"+line.nik_user+"</span><br>"+line.tgljam);
						last.fnt.setSize(8);
						last.setColor("#655d9f");
					}
					ix++;
				}
			}else throw(data);
			var bgleftbtm = new portalui_image(this.panel);
			bgleftbtm.setBound(0,25+content.height,5,8);					
			bgleftbtm.setImage("image/themes/dynpro/bgleftbtm.png");
			var bgcenterbtm = new portalui_panel(this.panel);
			bgcenterbtm.setBound(5,25+content.height,this.panel.width-10,8);			
			bgcenterbtm.setBorder(0);
			bgcenterbtm.getCanvas().style.background = "url(image/themes/dynpro/bgcenterbtm.png)";
			var bgrightbtm = new portalui_image(this.panel);
			bgrightbtm.setBound(this.panel.width-5,25+content.height,5,8);					
			bgrightbtm.setImage("image/themes/dynpro/bgrightbtm.png");
		}catch(e){
			systemAPI.alert(e);s
		}
	},
	doClickForum: function(sender){
		try{		
			this.addPath(sender.getCaption(), sender.getTag(),1);
			this.idkategori=sender.getTag();			
			this.childBlock.show();
			this.panel.free();			
			this.panel = new portalui_panel(this.pDetail);
			this.panel.setBound(0,0,this.pDetail.width,415);			
			this.panel.setBorder(0);
			this.panel.setScroll(true);
			this.panel.getCanvas().style.background = "";			
			var newtopik = new portalui_button(this.panel);
			newtopik.setBound(1,1,100,18);
			newtopik.setIcon("url(icon/"+system.getThemes()+"/newtopik.png)");
			newtopik.setCaption("NEWTOPIK");
			newtopik.setTag("NEWTOPIK");
			newtopik.onClick.set(this,"doBtnClick");
			var bglefttop = new portalui_image(this.panel);
			bglefttop.setBound(0,25,5,25);					
			bglefttop.setImage("image/themes/dynpro/bglefttop.png");
			var bgcentertop = new portalui_panel(this.panel);
			bgcentertop.setBound(5,25,this.panel.width-10,25);			
			bgcentertop.setBorder(0);
			bgcentertop.getCanvas().style.background = "url(image/themes/dynpro/bgcentertop.png)";
			var bgrighttop = new portalui_image(this.panel);
			bgrighttop.setBound(this.panel.width-5,25,5,25);					
			bgrighttop.setImage("image/themes/dynpro/bgrighttop.png");
			var dat = new portalui_control(this.panel);
			dat.setBound(6,32,this.panel.width-10,20);
			var canvas = dat.getCanvas();			
			var html="<table width='"+(this.panel.width-11)+"' border='0' cellpadding='0' cellspacing='0'>"+
						  "<tr style='font-size:11px;color:#FFFFFF;'>"+
						    "<td width='"+(this.panel.width-320)+"'>TOPICS</td>"+
						    "<td width='70' align='center'>REPLIES</td>"+
						    "<td width='70' align='center'>VIEWS</td>"+
							"<td width='180' align='center'>LAST POST</td>"+
						  "</tr>"+
						"</table>";
			canvas.innerHTML=html;
			var content = new portalui_panel(this.panel);
			content.setBound(0,50,this.panel.width,25);			
			content.setBorder(0);
			content.getCanvas().style.background = "#12a3eb";
			var data = this.dbLib.getDataProvider("select a.kode_pesan,a.judul,a.nik_buat, date_format(a.tanggal,'%d/%m/%Y, %h:%i %p') as tgljam,a.jml_reply,a.jml_view, "+
				"(case when (select max(tanggal) from portal_forum_pesan where parent=a.kode_pesan and status='C' and kode_lokasi='"+this.app._kodeLokasi+"') is null then "+
				"(select max(date_format(tanggal,'%d/%m/%Y, %h:%i %p')) from portal_forum_pesan where parent=a.kode_pesan and status='P' and kode_lokasi='"+this.app._kodeLokasi+"') else "+
				"(select max(date_format(tanggal,'%d/%m/%Y, %h:%i %p')) from portal_forum_pesan where parent=a.kode_pesan and status='C' and kode_lokasi='"+this.app._kodeLokasi+"') end) as lastpost "+
				"from portal_forum_pesan a "+
				"where a.status='P' and a.kode_kategori='"+sender.getTag()+"' and a.kode_lokasi='"+this.app._kodeLokasi+"' order by a.tanggal ");
			eval("data = "+data+";");
			if (typeof(data)=="object"){
				if (data.rs.rows[0] != undefined){
					var ix=1, line;
					for (var i in data.rs.rows)
					{						
						line = data.rs.rows[i];
						content.setHeight(41*ix);
						var pfrm = new portalui_panel(content);
						pfrm.setBound(5,41*i,this.panel.width-10,40);						
						pfrm.setBorder(1);
						if (i%2 == 1)
							pfrm.setColor("#ecf3f7");
						else
							pfrm.setColor("#e1ebf2");
						var dat2 = new portalui_control(pfrm);
						dat2.setBound(1,12,pfrm.width,20);
						var canvas2 = dat2.getCanvas();
						canvas2.style.overflow="auto";
						var html2="<table width='"+(pfrm.width-1)+"' border='0' cellpadding='0' cellspacing='0'>"+
									  "<tr style='font-size:12px;color:#655d9f;'>"+
									    "<td width='"+(pfrm.width-311)+"'>&nbsp;</td>"+
									    "<td width='70' align='center'>"+line.jml_reply+"</td>"+
									    "<td width='70' align='center'>"+line.jml_view+"</td>"+
										"<td width='180'>&nbsp;</td>"+
									  "</tr>"+
									"</table>";
						canvas2.innerHTML=html2;
						var buletfrm = new portalui_image(pfrm);
						buletfrm.setBound(10,7,27,27);								
						buletfrm.setImage("image/themes/dynpro/btopik.png");
						var nmfrm = new portalui_label(pfrm);
						nmfrm.setBound(47,3,150,20);
						nmfrm.setCaption(line.judul);
						nmfrm.fnt.setSize(10);
						nmfrm.setColor("#0000ff");
						nmfrm.setTag(line.kode_pesan);
						nmfrm.setLineText();
						nmfrm.getCanvas().style.cursor="pointer";
						nmfrm.onClick.set(this,"doClickTopic");
						var post = new portalui_label(pfrm);
						post.setBound(47,21,200,50);
						post.setTag(line.nik_buat);
						post.setCaption("by <a href='#' onclick='return window.app_kopeg_transaksi_fTabForum.userklik=true;' style='color:#aa0000;'>"+line.nik_buat+"</a> >> "+line.tgljam);
						post.fnt.setSize(8);
						post.setColor("#655d9f");
						post.onClick.set(this,"doUserOnClick");
						var p1 = new portalui_panel(pfrm);
						p1.setBound(pfrm.width-320,3,1,34);						
						p1.setBorder(0);
						p1.getCanvas().style.background = "#FFFFFF";
						var p2 = new portalui_panel(pfrm);
						p2.setBound(pfrm.width-250,3,1,34);						
						p2.setBorder(0);
						p2.getCanvas().style.background = "#FFFFFF";
						var p3 = new portalui_panel(pfrm);
						p3.setBound(pfrm.width-180,3,1,34);						
						p3.setBorder(0);
						p3.getCanvas().style.background = "#FFFFFF";
						var last = new portalui_label(pfrm);
						last.setBound(pfrm.width-170,6,150,50);
						last.setTag(line.nik_buat);
						last.setCaption("by <a href='#' onclick='return window.app_kopeg_transaksi_fTabForum.userklik=true;' style='color:#aa0000;'>"+line.nik_buat+"</a><br>"+line.lastpost);
						last.fnt.setSize(8);
						last.setColor("#655d9f");
						last.onClick.set(this,"doUserOnClick");
						ix++;
					}
				}else
				{
					content.setHeight(41);
					var pfrm = new portalui_panel(content);
					pfrm.setBound(5,0,this.panel.width-10,40);					
					pfrm.setBorder(1);
					pfrm.setColor("#e1ebf2");
					var nmfrm = new portalui_label(pfrm);
					nmfrm.setBound(47,11,150,20);
					nmfrm.setCaption("Tidak Ada Data");
					nmfrm.fnt.setSize(10);
					nmfrm.setColor("#0000ff");
				}
			}else throw(data);
			var bgleftbtm = new portalui_image(this.panel);
			bgleftbtm.setBound(0,50+content.height,5,8);					
			bgleftbtm.setImage("image/themes/dynpro/bgleftbtm.png");
			var bgcenterbtm = new portalui_panel(this.panel);
			bgcenterbtm.setBound(5,50+content.height,this.panel.width-10,8);			
			bgcenterbtm.setBorder(0);
			bgcenterbtm.getCanvas().style.background = "url(image/themes/dynpro/bgcenterbtm.png)";
			var bgrightbtm = new portalui_image(this.panel);
			bgrightbtm.setBound(this.panel.width-5,50+content.height,5,8);					
			bgrightbtm.setImage("image/themes/dynpro/bgrightbtm.png");
			this.childBlock.hide();
		}catch(e){
			systemAPI.alert("doClickForum : "+e,data);
		}
	},
	doUserOnClick: function(sender){
		try{
			var nik=sender.getTag();
			if (true)
			{
				this.childBlock.show();
				var data1 = this.dbLib.getDataProvider("select date_format(min(tanggal),'%d/%m/%Y, %h:%i %p') as joined,count(*) as totpost, "+
				"truncate((count(*)*100)/(select count(*) from portal_forum_pesan),2) as prosentase "+
				"from portal_forum_pesan where nik_buat='"+nik+"' and kode_lokasi='"+this.app._kodeLokasi+"' ");
				var data2 = this.dbLib.getDataProvider("select a.nama, "+
				"(select count(*) from portal_forum_pesan where nik_buat='"+nik+"' and kode_kategori=a.kode_kategori) as jum, "+
				"truncate(((select count(*) from portal_forum_pesan where nik_buat='"+nik+"' and kode_kategori=a.kode_kategori)*100)/(select count(*) from portal_forum_pesan),2) as prosen "+
				"from portal_forum_kategori a where a.tipe='Posting' and a.kode_lokasi='"+this.app._kodeLokasi+"' order by prosen desc");
				var data3 = this.dbLib.getDataProvider("select a.judul, "+
				"(select count(*) from portal_forum_pesan where nik_buat='"+nik+"' and parent=a.parent) as jum, "+
				"truncate(((select count(*) from portal_forum_pesan where nik_buat='"+nik+"' and parent=a.parent)*100)/(select count(*) from portal_forum_pesan where nik_buat='"+nik+"'),2) as prosen "+
				"from portal_forum_pesan a "+
				"where a.status='P' and a.kode_lokasi='"+this.app._kodeLokasi+"' order by jum desc");
				eval("data1 = "+data1+";");
				eval("data2 = "+data2+";");
				eval("data3 = "+data3+";");
				this.showStatistik(data1,data2,data3);
				this.childBlock.hide();
			}			
		}catch(e){
			systemAPI.alert("doUserOnClick : "+e,"");
		}
	},
	doUserClick: function(gettag){
		try{	
			this.doUserOnClick("");
		}catch(e)
		{
			system.alert(this,"app_kopeg_transaksi_fTabForum::doUserClick : "+e,"");
		}
	},
	showStatistik: function(data1,data2,data3){
		try{
			this.pgr.hide();
			this.panel.free();
			this.panel = new portalui_panel(this.pDetail);
			this.panel.setBound(1,1,this.pDetail.width-3,413);			
			this.panel.setBorder(3);
			this.panel.setCaption("User Statistics");
			this.panel.setScroll(true);
			this.panel.getCanvas().style.background = "#cadceb";			
			var dat2 = new portalui_control(this.panel);
			dat2.setBound(0,30,this.panel.width-30,150);
			var canvas2 = dat2.getCanvas();
			canvas2.style.overflow="auto";
			var html2="<table width='100%' border='0' cellspacing='2' cellpadding='2'>"+
					  "<tr>"+
						"<td width='20%' style='font-size:12px;color:#000000;'><div align='right'>Joined : </div></td>"+
						"<td width='80%' style='font-size:12px;color:#9d7d82;'>"+data1.rs.rows[0].joined+"</td>"+
					  "</tr>"+
					  "<tr>"+
						"<td style='font-size:12px;color:#000000;'><div align='right'>Total Posts : </div></td>"+
						"<td style='font-size:12px;color:#9d7d82;'>"+data1.rs.rows[0].totpost+" ("+data1.rs.rows[0].prosentase+"% of all posts)</td>"+
					  "</tr>"+
					  "<tr>"+
						"<td style='font-size:12px;color:#000000;'><div align='right'>Most Active Forum :</div></td>"+
						"<td style='font-size:12px;color:#105289;'>"+data2.rs.rows[0].nama+"</td>"+
					  "</tr>"+
					  "<tr>"+
						"<td>&nbsp;</td>"+
						"<td style='font-size:12px;color:#9d7d82;'>("+data2.rs.rows[0].jum+" Posts / "+data2.rs.rows[0].prosen+"% of your posts)</td>"+
					  "</tr>"+
					  "<tr>"+
						"<td style='font-size:12px;color:#000000;'><div align='right'>Most Active Topic :</div></td>"+
						"<td style='font-size:12px;color:#105289;'>"+data3.rs.rows[0].judul+"</td>"+
					  "</tr>"+
					  "<tr>"+
						"<td><div align='right'></div></td>"+
						"<td style='font-size:12px;color:#9d7d82;'>("+data3.rs.rows[0].jum+" Posts / "+data3.rs.rows[0].prosen+"% of your posts)</td>"+
					  "</tr>"+
					"</table>";
			canvas2.innerHTML=html2;
		}catch(e)
		{
			systemAPI.alert("showStatistik : "+e,"");
		}
	},
	doPager: function(sender,pageid){
		try{
			this.childBlock.show();
			var data = this.dbLib.getDataProviderPage(this.sql,pageid, 5);
			eval("data = "+data+";");
			this.showPost(data,pageid-1);
			this.childBlock.hide();
		}catch(e){
			systemAPI.alert("app_kopeg_transaksi_fTabForum.prototype.doPager"+e);
		}
	},
	doClickTopic: function(sender){
		try{
			this.addPath(sender.getCaption(),sender.getTag(),2);
			this.childBlock.show();
			this.pgr.show();
			this.sql="select a.*,date_format(a.tanggal,'%d/%m/%Y, %h:%i %p') as tgljam, "+
					"(select count(*) from portal_forum_pesan where kode_lokasi='"+this.app._kodeLokasi+"') as post,b.status_ol, "+
					"date_format((select min(tanggal) from portal_forum_pesan where nik_buat=a.nik_buat and parent='"+sender.getTag()+"' and kode_lokasi='"+this.app._kodeLokasi+"'),'%d/%m/%Y, %h:%i %p') as joint "+
					"from portal_forum_pesan a inner join (select kode_sales,status_ol from portal_sales union select kode_cust,status_ol from portal_cust) b on a.nik_buat=b.kode_sales "+
					"where a.parent='"+sender.getTag()+"' and kode_lokasi='"+this.app._kodeLokasi+"' order by a.tanggal ";
			var sqlcount="select count(*) "+
					"from portal_forum_pesan a inner join (select kode_sales,status_ol from portal_sales union select kode_cust,status_ol from portal_cust) b on a.nik_buat=b.kode_sales "+
					"where a.parent='"+sender.getTag()+"' and kode_lokasi='"+this.app._kodeLokasi+"' ";
					
			sql = "update portal_forum_pesan set jml_view=jml_view+1 "+
					"where kode_pesan='"+sender.getTag()+"'";
			this.btnsender=sender;
			this.dbLib.execQuery(sql);
			var data = this.dbLib.getDataProviderPage(this.sql,1,5);
			this.pgr.setTotalPage(this.dbLib.getRowCount(sqlcount,5));
			eval("data = "+data+";");
			this.showPost(data,0);
			this.childBlock.hide();
		}catch(e){
			systemAPI.alert("doClickTopic : "+e,"");
		}
	},
	showPost: function(data,pageid){
		try
		{			
			this.panel.free();
			this.panel = new portalui_panel(this.pDetail);
			this.panel.setBound(0,0,this.pDetail.width,415);
			this.panel.setBorder(0);
			this.panel.setScroll(true);
			this.panel.getCanvas().style.background = "";
			this.panel=this.panel;
			var postreply = new portalui_button(this.panel);
			postreply.setBound(1,1,100,20);
			postreply.setIcon("url(icon/"+system.getThemes()+"/postreply.png)");
			postreply.setCaption("POSTREPLY");
			postreply.setTag("POSTREPLY");
			postreply.onClick.set(this,"doBtnClick");
			var lebar=0;
			if (typeof data == "object"){
				if (data.rs.rows[0] != undefined){										
					var line;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];
						if (i==0 && pageid==0){
							this.resubjek="Re : "+line.judul;
							this.reidpsn=line.kode_pesan;
						}
						var pfrm = new portalui_panel(this.panel);
						pfrm.setBound(0,(151*i)+23+lebar,this.panel.width-20,150);
						pfrm.setBorder(0);						
						if (i%2 == 1)
							pfrm.setColor("#ecf3f7");
						else
							pfrm.setColor("#e1ebf2");						
						var nmfrm = new portalui_label(pfrm);
						nmfrm.setBound(10,3,200,20);
						nmfrm.setCaption(line.judul);
						nmfrm.fnt.setSize(10);
						nmfrm.setColor("#105289");
						nmfrm.setTag(line.kode_pesan);
						var post = new portalui_label(pfrm);
						post.setBound(10,21,200,50);
						post.setHeight(50);
						post.setTag(line.nik_buat);
						post.setCaption("by <a href='#' onclick='return window.app_kopeg_transaksi_fTabForum.userklik=true;' style='color:#aa0000;'>"+line.nik_buat+"</a> >> "+line.tgljam);
						post.fnt.setSize(8);
						post.setColor("#655d9f");
						post.onClick.set(this,"doUserOnClick");
						var dat2 = new portalui_control(pfrm);
						dat2.setBound(9,40,pfrm.width-300,100);
						var canvas2 = dat2.getCanvas();
						canvas2.style.overflow="auto";
						var html2="<table width='"+(pfrm.width-330)+"' border='0' cellpadding='0' cellspacing='0'>"+
									  "<tr style='font-size:11px;color:#000000;'>"+
									    "<td width='"+(pfrm.width-311)+"'>"+line.keterangan+"</td>"+
									  "</tr>"+
									"</table>";
						html2=html2.replace(/\\/gi,"");						
						canvas2.innerHTML=html2;
						if (line.gambar !="-" && line.gambar!="" && line.gambar!=undefined)
						{
							pfrm.setHeight(360);
							var gbr = new portalui_image(pfrm);
							gbr.setBound(10,150,200,200);
							gbr.setImage("server/media/"+line.gambar);
							gbr.setViewLup(true);
							gbr.onClick.set(this,"doImgClick");
							lebar = lebar + 210;
						}
						if (this.app.ceklogin){
							var p2 = new portalui_panel(pfrm);
							p2.setBound(pfrm.width-290,3,1,144);							
							p2.setBorder(0);
							p2.getCanvas().style.background = "#FFFFFF";
							var btnedit = new portalui_button(pfrm);
							btnedit.setBound(pfrm.width-270,10,80,18);
							btnedit.setIcon("url(icon/"+system.getThemes()+"/postreply.png)");
							btnedit.setCaption("Edit");
							btnedit.setTag(line.kode_pesan);
							btnedit.onClick.set(this,"doBtnEdit");
							var btnreply = new portalui_button(pfrm);
							btnreply.setBound(pfrm.width-270,35,80,18);
							btnreply.setIcon("url(icon/"+system.getThemes()+"/postreply.png)");
							btnreply.setCaption("Reply");
							btnreply.setTag(line.kode_pesan);
							btnreply.onClick.set(this,"doBtnEdit");
							var send = new portalui_button(pfrm);
							send.setBound(pfrm.width-170,90,90,18);
							send.setIcon("url(icon/"+system.getThemes()+"/message.png)");
							send.setCaption("Kirim Pesan");
							send.setTag(line.kode_pesan);
							send.onClick.set(this,"doBtnClick");
						}
						var p3 = new portalui_panel(pfrm);
						p3.setBound(pfrm.width-180,2,1,144);						
						p3.setBorder(0);
						p3.getCanvas().style.background = "#FFFFFF";
						if (line.status_ol=="0"){
							var ol="OFFLINE";
							var wrn="#034a59";
						}else {
							var ol="ONLINE";
							var wrn="#0b9ce4";
						}
						var post2 = new portalui_label(pfrm);
						post2.setBound(pfrm.width-167,10,160,50);
						post2.setTag(line.nik_buat);
						post2.setCaption("<a href='#' onclick='return window.app_kopeg_transaksi_fTabForum.userklik=true;' style='color:#aa0000;'>"+line.nik_buat+"</a>");
						post2.fnt.setSize(8);
						post2.setColor("#655d9f");
						post2.onClick.set(this,"doUserOnClick");
						var dat3 = new portalui_control(pfrm);
						dat3.setBound(pfrm.width-170,25,160,73);
						var canvas3 = dat3.getCanvas();
						canvas3.style.overflow="auto";
						var html3="<table width='160' border='0' cellpadding='1' cellspacing='1'>"+
									  "<tr style='font-size:11px;color:"+wrn+";'>"+
									    "<td>"+ol+"</td>"+
									  "</tr>"+
									  "<tr style='font-size:11px;color:#574058;'>"+
									    "<td>Posts : "+line.post+"</td>"+
									  "</tr>"+
									  "<tr style='font-size:11px;color:#574058;'>"+
									    "<td>Joined : "+line.joint+"</td>"+
									  "</tr>"+
									"</table>";
						canvas3.innerHTML=html3;						
					}
				}else{}
			}else throw(data);
			this.childBlock.hide();
		}catch(e){
			system.alert(this,"app_kopeg_transaksi_fTabForum::showPost : "+e,"");
		}
	},
	doImgClick: function(sender){
		sender.showActualSize();
	},
	postingForm: function(sender,resbj,file,msg){
		try
		{
			this.pgr.hide();
			this.childBlock.hide();
			this.panel.free();
			this.panel = new portalui_panel(this.pDetail);
			this.panel.setBound(1,1,this.pDetail.width-15,400);			
			this.panel.setBorder(3);
			
			this.panel.getCanvas().style.background="url(image/themes/dynpro/back_tab.gif)";
			this.panel.setScroll(true);			
			this.subjek = new portalui_saiLabelEdit(this.panel);
			this.subjek.setBound(20,35,this.pDetail.width-42,20);
			this.subjek.setCaption("Subject");
			this.subjek.setReadOnly(false);
			this.subjek.setLength(200);
			this.attfile = new portalui_saiLabelEdit(this.panel);
			this.attfile.setBound(20,58,250,20);
			this.attfile.setCaption("File Attachment");
			this.attfile.setReadOnly(false);
			this.attfile.setText("-");
			uses("portalui_uploader");
			this.attach = new portalui_uploader(this.panel);
			this.attach.setBound(280,58,80,20);		
			this.attach.onAfterUpload.set(this,"doAfterLoad");
			this.attach.setParam4("data");
			this.attach.setParam1(this.app.userlog);
			this.attach.setAutoSubmit(true);
			this.attach.onChange.set(this,"doFileChange");			
			
			var bSmile = new portalui_button(this.panel);
			bSmile.setBound(390,58,80,20);
			bSmile.setCaption("Smilies");
			bSmile.setIcon("url(icon/smilies/icon_lol.gif)");
			bSmile.onClick.set(this,"doBtnClick");
			bSmile.setName("bSmile");
			
			uses("portalui_richTextArea");
			this.pesan = new portalui_richTextArea(this.panel);
			this.pesan.setBound(17,81,this.pDetail.width-40,250);			
			this.pesan.display();	
			var bsend = new portalui_button(this.panel);
			bsend.setBound(this.pDetail.width-132,340,80,20);
			bsend.setCaption("Submit");
			bsend.setIcon("url(icon/"+system.getThemes()+"/message.png)");
			bsend.onClick.set(this,"doBtnClick");
			bsend.setName("bsend");			
			
			var smile = new portalui_panel(this.panel);
			smile.setBound(390,78,100,180);			
			smile.setBorder(3);
			smile.setCaption("Smilies");
			//smile.getCanvas().style.background="";
			smile.hide();
			this.psmile = smile;
			var data = this.dbLib.getDataProvider("select * from portal_icon ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				if (data.rs.rows[0] != undefined){
					var p=0;
					var l=0;
					var line=0;
					for (var i in data.rs.rows){
						line = data.rs.rows[i];
						var icnSmile = new portalui_image(smile);
						icnSmile.setBound((20*p)+10,(22*l)+25,15,17);						
						icnSmile.setImage(line.gambar);
						icnSmile.setTag(line.code);
						icnSmile.onClick.set(this,"doSmilyClick");
						icnSmile.getCanvas().style.cursor="pointer";
						p++;
						if (p==4){
							p=0;
							l++;
						}
					}
				}
			}else throw(data);
			if (sender=="topik"){
				this.panel.setCaption("Post a New Topik");
				bsend.setTag("sTopik");
			}else if (sender=="reply"){
				this.panel.setCaption("Post a Reply");
				this.subjek.setText(resbj);
				bsend.setTag("sReply");
			}else if (sender=="edit"){
				this.panel.setCaption("Edit Post");
				this.subjek.setText(resbj);
				this.attfile.setText(file);
				this.pesan.setText(msg);
				bsend.setTag("edit");
			}else if (sender=="reply2"){
				this.panel.setCaption("Post A Reply");
				this.subjek.setText(resbj);
				bsend.setTag("reply2");
			}
			this.childBlock.hide();
		}catch(e)
		{
			systemAPI.alert("postingForm : "+e,"");
		}
	},
	doSmilyClick: function(sender){
		try{
			var img = document.createElement("IMG");
			img.src = sender.filePath;
			this.pesan.insertNodeAtSelection(img);
		}catch(e){
			systemAPI.alert("doSmilyClick : "+e,"");
		}
	},
	doBtnEdit : function(sender){
		try{
			var data = this.dbLib.getDataProvider("select a.* from portal_forum_pesan a "+
										"where a.kode_pesan='"+sender.getTag()+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				if (data.rs.rows[0] != undefined){
					this.edIDPsn=data.rs.rows[0].kode_pesan;
					if (sender.getCaption() == "Edit")
						this.postingForm("edit",data.rs.rows[0].judul,data.rs.rows[0].gambar,data.rs.rows[0].keterangan);
					else if (sender.getCaption() == "Reply")
						this.postingForm("reply2",data.rs.rows[0].judul,data.rs.rows[0].gambar,data.rs.rows[0].keterangan);
				}
			}else throw(data);
		}catch(e)
		{
			system.alert(this,"app_kopeg_transaksi_fTabForum::doBtnEdit : "+e,"");
		}
	},
	doBtnClick: function(sender){
		try{
			this.execcek=true;
			if (sender.getName() == "bSmile"){
				this.psmile.setVisible(!this.psmile.visible);
			}
			if (sender.getTag() == "reply2")
			{
				this.btnSubmit="submit";
				var id=this.standarLib.noBuktiOtomatis(this.dbLib, "portal_forum_pesan", "kode_pesan", "FRM/"+this.getForm().getPeriodeNow()+"/","00000");
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("insert into portal_forum_pesan (kode_pesan,kode_lokasi,kode_kategori,nik_buat, tanggal,judul,keterangan,gambar,file_dok,periode,nik_user,tgl_input,parent,jml_view,jml_reply, status,icon) values  "+
						"('"+id+"','"+this.app._lokasi+"','"+this.idkategori+"','"+this.app.userlog+"',now(),'"+this.subjek.getText()+"','"+this.pesan.getText(2)+"','"+this.attfile.getText()+"','-','"+this.getForm().getPeriodeNow()+"','"+this.app.userlog+"',now(),'"+this.reidpsn+"',0,0,'C','-') ");
				sql.add("update portal_forum_kategori set jml_post=jml_post+1 "+
						"where kode_kategori='"+this.idkategori+"'");
				sql.add("update portal_forum_pesan set jml_reply=jml_reply+1 "+
						"where kode_pesan='"+this.reidpsn+"'");
				this.dbLib.execArraySQL(sql);
				this.saveData = true;
			}
			if (sender.getTag() == "edit")
			{
				this.btnSubmit="submit";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("update portal_forum_pesan set judul='"+this.subjek.getText()+
						"',gambar='"+this.attfile.getText()+"',keterangan='"+this.pesan.getText(2)+
						"' where kode_pesan='"+this.edIDPsn+"'");
				this.dbLib.execArraySQL(sql);
				this.saveData = true;
			}
			if (sender.getTag() == "sReply")
			{
				this.btnSubmit="submit";
				var id=this.standarLib.noBuktiOtomatis(this.dbLib, "portal_forum_pesan", "kode_pesan", "FRM/"+this.getForm().getPeriodeNow()+"/","00000");
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("insert into portal_forum_pesan (kode_pesan,kode_lokasi,kode_kategori,nik_buat, tanggal,judul,keterangan,gambar,file_dok,periode,nik_user,tgl_input,parent,jml_view,jml_reply, status, icon) values  "+
						"('"+id+"','"+this.app._lokasi+"','"+this.idkategori+"','"+this.app.userlog+"',now(),'"+this.resubjek+"','"+this.pesan.getText(2)+"','"+this.attfile.getText()+"','-','"+this.getForm().getPeriodeNow()+"','"+this.app.userlog+"',now(),'"+this.reidpsn+"',0,0,'C','-') ");
				sql.add("update portal_forum_kategori set jml_post=jml_post+1 "+
						"where kode_kategori='"+this.idkategori+"'");
				sql.add("update portal_forum_pesan set jml_reply=jml_reply+1 "+
						"where kode_pesan='"+this.reidpsn+"'");
				this.dbLib.execArraySQL(sql);
				this.saveData = true;
			}
			if (sender.getTag() == "POSTREPLY")
			{
				if (this.app.ceklogin){
					this.postingForm("reply",this.resubjek);
				}else{
					systemAPI.alert("Silakan login terlebih dahulu sebagai sales atau customer.","");
				}
				this.execcek=false;
			}
			if (sender.getTag() == "NEWTOPIK")
			{
				if (this.app.ceklogin){
					this.postingForm("topik");
				}else{
					systemAPI.alert("Silakan login terlebih dahulu sebagai sales atau customer.","");
				}
				this.execcek=false;
			}
			if (sender.getTag() == "sTopik")
			{
				this.btnSubmit="submit";
				var id=this.standarLib.noBuktiOtomatis(this.dbLib, "portal_forum_pesan", "kode_pesan", "FRM/"+this.getForm().getPeriodeNow()+"/","00000");
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("insert into portal_forum_pesan (kode_pesan,kode_lokasi,kode_kategori,nik_buat, tanggal,judul,keterangan,gambar,file_dok,periode,nik_user,tgl_input,parent,jml_view,jml_reply, status) values  "+
						"('"+id+"','"+this.app._lokasi+"','"+this.idkategori+"','"+this.app.userlog+"',now(),'"+this.subjek.getText()+"','"+this.pesan.getText(2)+"','"+this.attfile.getText()+"','-','"+this.getForm().getPeriodeNow()+"','"+this.app.userlog+"',now(),'"+id+"',0,0,'P') ");
				sql.add("update portal_forum_kategori set jml_post=jml_post+1 "+
						"where kode_kategori='"+this.idkategori+"'");
				this.dbLib.execArraySQL(sql);
				this.saveData = true;
			}
			if (sender.getCaption() == "Kirim Pesan")
			{
				this.pgr.hide();
				this.panel.free();
				var data = this.dbLib.runSQL("select a.* from portal_forum_pesan a "+
										"where a.kode_pesan='"+sender.getTag()+"' ");
				if (data instanceof portalui_arrayMap)
				{
					if (data.get(0) != undefined)
					{
						this.edIDPsn=data.get(0).get("kode_pesan");
						this.childBlock.show();
						var p9 = new portalui_panel(this.pDetail);
						p9.setTop(1);
						p9.setLeft(1);
						p9.setWidth(this.pDetail.width - 4);
						p9.setHeight(412);
						p9.setCaption("Kirim Pesan");
						p9.setBorder(3);
						p9.getCanvas().style.background="url(image/themes/dynpro/back_tab.gif)";
						this.panel=p9;
						this.kpdf = new portalui_saiLabelEdit(p9);
						this.kpdf.setLeft(20);
						this.kpdf.setTop(23);
						this.kpdf.setWidth(250);
						this.kpdf.setCaption("Kepada");
						this.kpdf.setReadOnly(true);
						this.subjekf = new portalui_saiLabelEdit(p9);
						this.subjekf.setLeft(20);
						this.subjekf.setTop(45);
						this.subjekf.setWidth(620);
						this.subjekf.setCaption("Subyek");
						this.subjekf.setReadOnly(false);
						this.subjekf.setLength(100);
						this.attfilef = new portalui_saiLabelEdit(p9);
						this.attfilef.setLeft(20);
						this.attfilef.setTop(67);
						this.attfilef.setWidth(200);
						this.attfilef.setCaption("File Attachment");
						this.attfilef.setReadOnly(false);
						this.attfilef.setText("-");
						this.attachf = new portalui_uploader(p9);
						this.attachf.setLeft(230);
						this.attachf.setTop(67);
						this.attachf.setWidth(80);
						this.attachf.setHeight(20);
						this.attachf.onAfterUpload.set(this,"doAfterLoad");
						this.attachf.setParam4("data");
						this.attachf.setParam1(this.getForm().userforum);
						this.attachf.setAutoSubmit(true);
						this.attachf.onChange.set(this,"doFileChange");
						/*this.pesanf = new portalui_saiMemo(p9);
						this.pesanf.setTop(89);
						this.pesanf.setLeft(20);
						this.pesanf.setWidth(620);
						this.pesanf.setHeight(277);
						this.pesanf.setCaption("Pesan");*/
						uses("portalui_richTextArea",true);
						this.pesanf = new portalui_richTextArea(p9);
						this.pesanf.setTop(89);
						this.pesanf.setLeft(17);
						this.pesanf.setWidth(this.pDetail.width-177);
						this.pesanf.setHeight(250);
						//this.pesanf.onKeyDown.set(this,"doKeyDown");
						this.pesanf.display();
						var bsendf = new portalui_button(p9);
						bsendf.setLeft(this.pDetail.width-232);
						bsendf.setTop(378);
						bsendf.setCaption("Kirim");
						bsendf.setIcon("url(icon/"+system.getThemes()+"/message.png)");
						bsendf.onClick.set(this,"doBtnClick");
						bsendf.setTag("sendmsg");
						this.kpdf.setText(data.get(0).get("nik_buat"));
						this.subjekf.setText(data.get(0).get("judul"));
						var smile = new portalui_panel(p9);
						smile.setLeft(this.pDetail.width-147);
						smile.setWidth(this.pDetail.width-610);
						smile.setHeight(160);
						smile.setTop(81);
						smile.setBorder(3);
						smile.setCaption("Smilies");
						smile.getCanvas().style.background="";
						var data = this.dbLib.runSQL("select * from portal_icon ");
						if (data instanceof portalui_arrayMap)
						{
							if (data.get(0) != undefined)
							{
								var p=0;
								var l=0;
								for (var i in data.objList)
								{
									var icnSmile = new portalui_image(smile);
									icnSmile.setWidth(15);
									icnSmile.setHeight(17);
									icnSmile.setLeft((20*p)+10);
									icnSmile.setTop((22*l)+25);
									icnSmile.setImage(data.get(i).get("gambar"));
									icnSmile.setTag(data.get(i).get("code"));
									icnSmile.onClick.set(this,"doSmilyClick");
									icnSmile.getCanvas().style.cursor="pointer";
									p++;
									if (p==4)
									{
										p=0;
										l++;
									}
								}
							}
						}else throw(data);
						this.childBlock.hide();
					}
				}else throw(data);
			}
			if (sender.getTag() == "sendmsg")
			{
				this.btnSubmit="submit";
				var id=this.standarLib.noBuktiOtomatis(this.dbLib, "portal_pesan", "no_pesan", "PSN/"+this.getForm().getPeriodeNow()+"/","0000");
				//var pesan=this.textToSmily(this.pesanf.getText(2));
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("insert into portal_pesan (no_pesan,kode_lokasi,tanggal,dari, kepada,subyek,isi_pesan,flag_email,no_file_dok,tgl_input,flag_read,periode,nik_user,modul) values  "+
						"('"+id+"','"+this.app._lokasi+"',now(),'"+this.app.userlog+"','"+this.kpdf.getText()+"','"+this.subjekf.getText()+"','"+pesan+"','0','"+this.attfilef.getText()+"',now(),'0','"+this.getForm().getPeriodeNow()+"','"+this.app.userlog+"','FORUM') ");
				var data = this.dbLib.runSQL("select a.nama,a.email "+
					"from (select kode_sales,nama,email from portal_sales union select kode_cust,nama,email from portal_cust) as a "+
					"where a.kode_sales='"+this.kpdf.getText()+"'");	
				if (data instanceof portalui_arrayMap){
					if (data.get(0) != undefined){
						data = data.get(0);
						var kepada=data.get("email");
					}
				}else throw(data);
				data = this.dbLib.runSQL("select a.nama,a.email "+
					"from (select kode_sales,nama,email from portal_sales union select kode_cust,nama,email from portal_cust) as a "+
					"where a.kode_sales='"+this.app.userlog+"'");
				if (data instanceof portalui_arrayMap){
					if (data.get(0) != undefined){
						data = data.get(0);
						var dari=data.get("email");
					}
				}else throw(data);
				this.mail.send(dari,kepada,this.subjekf.getText(),pesan);
				this.dbLib.execArraySQL(sql);
				this.saveData = true;
				this.attfilef.setText("-");
			}
		}catch(e)
		{
			system.alert(this,"app_kopeg_transaksi_fTabForum::doBtnClick : "+e,"");
		}
	},
	treeClick: function(item){
		try{
			this.pgr.hide();
			this.panel.free();
			for (var i = 1; i < this.path.length;i++){
				if (this.path[i] !== undefined){
					this.path[i].free();				
				}
				this.path[i] = undefined;
			}
			this.doClickForum(item);
		}catch(e){
			systemAPI.alert("treeClick : " + e,"Error Class ::"+temp);
			this.childBlock.hide();
		}
	},
	loadMenu: function(daftarMenu){
		try{
			if (daftarMenu == undefined) return;
			var menu = daftarMenu;
			var rowNo = 0;		
			var itemValues = undefined;
			if (this.treev != undefined)
				this.treev.clear();
			
			var kode = undefined;
			var nama = undefined;
			var levelLap = undefined;
			var level = undefined;
			var item = undefined;
			var node = undefined;
			for( var rowNo in menu.rs.rows){
				itemValues = menu.rs.rows[rowNo];	
				kode = itemValues.kode_kategori;
				if (kode != "")
				{					
					nama = itemValues.nama;					
					level = itemValues.level_spasi;					
					level++;
					if (node == undefined)
					{
						node = new portalui_treeNode(this.treev);
					}else if ((node instanceof portalui_treeNode) && (node.getLevel() == level - 1))
					{
						node = new portalui_treeNode(node);
					}else if ((node instanceof portalui_treeNode) && (node.getLevel() == level))
					{	
						node = new portalui_treeNode(node.owner);
					}else if ((node instanceof portalui_treeNode) && (node.getLevel() > level))
					{	
						if (!(node.owner instanceof portalui_treeView))
						{
							node = node.owner;
							while (node.getLevel() > level)
							{
								if (node.owner instanceof portalui_treeNode)
									node = node.owner;
							}
						}
						node = new portalui_treeNode(node.owner);				
					}		
					node.setKodeForm("");
					node.setKode(kode);
					node.setCaption(nama);
					node.setShowKode(false);
					node.data = itemValues;
					node.setTag(kode.toUpperCase());
				}				
			}
		}catch(e){
			systemAPI.alert("row "+ rowNo +" : "+e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		try{
			if (sender == this.dbLib)
			{
				if (methodName == "getDataProvider"){
					eval("result= "+result+";");
					this.loadMenu(result);					
				}
				if (methodName == "execArraySQL")
				{
					if (result.toLowerCase().search("error") == -1)
					{
						if (this.execcek)
						{
							uses("util_file");
							 if  (this.btnSubmit == "submit") {
								this.uploadFile();
								this.standarLib.clearByTag(this, new Array("0"));
								system.info(this,"Proccess Complete....","");
								this.doClickTopic(this.btnsender);
							}
							this.btnSubmit="";
							this.execcek=false;
						}
					}else system.alert(this,"result= "+result,"");
				}
			}
			if (sender == this.file)
			{
				if (methodName == "copyFileTo")
				{
					if (result==undefined) 
						system.alert(this,"result2= "+result,"");
				}
			}
		}catch(e){
			systemAPI.alert("doRequestReady : "+e);
		}
	},
	doAfterLoad: function(sender, result, data){
		try{
			if (!result && this.saveData)
			{
				this.saveData = false;
			}else if (this.saveData){
				this.saveData = false;
			}
		}catch(e){
			systemAPI.alert("doAfterLoad: "+e);
		}
	},
	doFileChange: function(sender, filename, allow, data){
		try{
			if (this.tmpFile != ""){
				this.file = new util_file();								
				this.file.deleteFile(this.tmpFile);			
			}
			sender.setParam2("");
			if (data instanceof portalui_arrayMap){
				this.attfile.setText(data.filename);
				this.namaFile=data.filename;
				this.Folder=data.folder;
				this.tmpFile = data.tmpfile;
			}else throw(data);
		}catch(e){
			alert(e);
		}
	},
	deleteOldFile: function(sender){
		var rootDir = this.file.getRootDir();										
		var separator = rootDir.charAt(rootDir.length-1);						
		this.file.deleteFile(rootDir +"media"+separator+this.filename);
	},
	uploadFile: function(sender){
		if (this.tmpFile != ""){
			var rootDir = this.file.getRootDir();										
			var separator = rootDir.charAt(rootDir.length-1);						
			this.file.copyFileTo(this.tmpFile,rootDir+this.Folder+separator+this.namaFile,true);
			this.file.deleteFile(this.tmpFile);
			this.tmpFile = "";
		}
	},
	delTmpFile: function(){
		if (this.tmpFile != ""){
			this.file.deleteFile(this.tmpFile);
			this.tmpFile = "";
		}
	},
	addPath: function(path, id, index){		
		var left = 280;		
		for (var i in this.path) {
			if (this.path[i] !== undefined)
				left += this.path[i].width;					
		}
		var lblPath = new portalui_label(this);				
		if (index > 0 && path.search("=>") == -1) path = "=>" + path;
		lblPath.setBound(left,80,(path.length * 7),20);
		lblPath.setAutoWidth(true);
		lblPath.setCaption(path);			
		lblPath.setData(index);
		lblPath.setTag(id);
		lblPath.addStyle("cursor:pointer;color:#0000ff");
		lblPath.onClick.set(this,"doClickPath");
		this.path[index] = lblPath;
	},
	doClickPath: function(sender){		
		try{
			this.pgr.hide();
			for (var i = sender.getData(); i < this.path.length;i++){
				if (this.path[i] !== undefined){
					this.path[i].free();				
				}
				this.path[i] = undefined;
			}					
			switch(sender.getData()){
				case 0 : this.showForum(); break;
				case 1 : this.doClickForum(sender);break;
				case 2 : this.doClickTopic(sender);break;
			}				
		}catch(e){
			systemAPI.alert(e);
		}
	}
});