window.app_saku3_transaksi_uin_fProgram = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fProgram.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fProgram";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Program", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		

		this.c_tahun = new saiCB(this,{bound:[20,12,200,20],caption:"Tahun", readOnly:true,tag:2});
		this.cb_dept = new portalui_saiCBBL(this,{bound:[20,10,220,20],caption:"Departemen", tag:2, maxLength:20,readOnly:true, change:[this,"doChange"]});		
		this.cb_unit = new portalui_saiCBBL(this,{bound:[20,12,220,20],caption:"Unit", tag:2, maxLength:20,readOnly:true,change:[this,"doChange"]});		
		this.cb_prog = new portalui_saiCBBL(this,{bound:[20,13,220,20],caption:"Program", tag:2, maxLength:20,readOnly:true,change:[this,"doChange"]});		

		this.pc1 = new pageControl(this,{bound:[20,10,1000,385], childPage:["Kegiatan","Output","Detail Output","Komponen","Detail Komponen","Setup Dtl Komp"]});						
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
		            colTitle:["Kode","Nama KL / Unit Es.I / Program / Kegiatan","Fung","Sub Fung","Pilih"],
					colWidth:[[4,3,2,1,0],[70,60,60,500,100]],					
					readOnly:true,					
					colFormat:[[4],[cfButton]],
					click:[this,"doSgBtnClick1"], colAlign:[[4],[alCenter]],
					dblClick:[this,"doDoubleClick"],
					autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
		            colTitle:["Kode","Nama","Pilih"],
					colWidth:[[2,1,0],[70,500,100]],
					readOnly:true,
					colFormat:[[2],[cfButton]],
					click:[this,"doSgBtnClick2"], colAlign:[[2],[alCenter]],
					dblClick:[this,"doDoubleClick2"],
					autoAppend:false,defaultRow:1});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2,pager:[this,"doPager2"]});
		
		this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
		            colTitle:["Kode","Nama","Pilih"],
					colWidth:[[2,1,0],[70,500,100]],
					readOnly:true,
					click:[this,"doSgBtnClick3"], colAlign:[[2],[alCenter]],					
					dblClick:[this,"doDoubleClick3"],
					autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});

		this.sg4 = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
		            colTitle:["Kode","Nama","Pilih"],
					colWidth:[[2,1,0],[70,500,100]],
					readOnly:true,
					click:[this,"doSgBtnClick4"], colAlign:[[2],[alCenter]],					
					dblClick:[this,"doDoubleClick4"],
					autoAppend:false,defaultRow:1});		
		this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg4,pager:[this,"doPager4"]});

		this.sg5 = new saiGrid(this.pc1.childPage[4],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
					colTitle:["Kode Dtl","Nama","Pilih"],
					colWidth:[[2,1,0],[70,500,80]],
					readOnly:true,	
					click:[this,"doSgBtnClick5"], colAlign:[[2],[alCenter]],					
					dblClick:[this,"doDoubleClick5"],		
					autoAppend:false,defaultRow:1});		
		this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[4],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg5});

		this.cb_giat = new saiCBBL(this.pc1.childPage[5],{bound:[20,10,220,20],caption:"Kegiatan",  maxLength:10, tag:2, readOnly:true});
		this.cb_out = new saiCBBL(this.pc1.childPage[5],{bound:[20,11,220,20],caption:"Output",  maxLength:10, tag:2, readOnly:true});
		this.cb_dout = new saiCBBL(this.pc1.childPage[5],{bound:[20,12,220,20],caption:"Detail Output",  maxLength:10, tag:2, readOnly:true});
		this.cb_komp = new saiCBBL(this.pc1.childPage[5],{bound:[20,13,220,20],caption:"Komponen",  maxLength:10, tag:2, readOnly:true});		
		this.cb_dkomp = new saiLabelEdit(this.pc1.childPage[5],{bound:[20,10,200,20],caption:"Kd Detl Komp",maxLength:20,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[5],{bound:[20,11,600,20],caption:"Nama Detl Komp", maxLength:200, tag:1});	
		
		this.sg6 = new saiGrid(this.pc1.childPage[5],{bound:[1,5,this.pc1.width-5,207],colCount:2,tag:9,
				colTitle:["Kode Akun","Nama"],
				colWidth:[[1,0],[500,80]],	
				columnReadOnly:[true,[1],[0]],
				buttonStyle:[[0],[bsEllips]], 
				ellipsClick:[this,"doEllipsClick6"], change:[this,"doChangeCell6"],							
				autoAppend:true,defaultRow:1});		
		this.sgn6 = new portalui_sgNavigator(this.pc1.childPage[5],{bound:[1,this.pc1.height-25,this.pc1.width-2,25],buttonStyle:2,grid:this.sg6});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[5].rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
				
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();	

			this.c_tahun.clear();		
			var data = this.dbLib.getDataProvider("select tahun from uin_tahun where flag_aktif='1' order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}
			
			var strSQL = "select distinct a.kdsatker,a.kdprogram,a.kddept,a.kdunit "+
						 "from uin_user a "+
						 "where a.nik ='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){						
					this.kddept = line.kddept;
					this.kdunit = line.kdunit;	
					this.kdsatker = line.kdsatker;					
					this.kdprogram = line.kdprogram;											
				}
			}
			this.cb_dept.setSQL("select kddept, nmdept from uin_dept",["kddept","nmdept"],false,["Kode","Nama"],"and","Data Departemen",true);				
			this.cb_dept.setText(this.kddept);
			this.cb_akun.setSQL("select kdakun, nmakun from uin_akun where kdjenbel='5'",["kdakun","nmakun"],false,["Kode","Nama"],"and","Data Akun",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fProgram.extend(window.childForm);
window.app_saku3_transaksi_uin_fProgram.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into uin_d_skmpnen(thang,kdsatker,kddept,kdunit,kdprogram,kdgiat,kdoutput,kdsoutput,kdkmpnen,kdskmpnen,urskmpnen) values "+
							"('"+this.c_tahun.getText()+"','"+this.kdsatker+"','"+this.kddept+"','"+this.kdunit+"','"+this.kdprogram+"','"+this.kdgiat+"','"+this.kdoutput+"','"+this.kdsoutput+"','"+this.kdkmpnen+"','"+this.cb_dkomp.getText()+"','"+this.e_nama.getText()+"')");							
					if (this.sg6.getRowValidCount() > 0){
						for (var i=0;i < this.sg6.getRowCount();i++){
							if (this.sg6.rowValid(i)){
								sql.add("insert into uin_d_akun(thang, kdjendok, kdsatker, kddept, kdunit, kdprogram, kdgiat, kdoutput, kdlokasi, kdkabkota, kddekon, kdsoutput, kdkmpnen, kdskmpnen, kdakun, kdkppn, kdbeban, kdjnsban, kdctarik, register, carahitung, prosenphln, prosenrkp, prosenrmp, kppnrkp, kppnrmp, kppnphln, regdam, kdluncuran, kdblokir, uraiblokir, kdib) values "+
										"('"+this.c_tahun.getText()+"', '-', '"+this.kdsatker+"', '"+this.kddept+"', '"+this.kdunit+"', '"+this.kdprogram+"', '"+this.kdgiat+"', '"+this.kdoutput+"', '-', '-', '-', '"+this.kdsoutput+"', '"+this.kdkmpnen+"', '"+this.cb_dkomp.getText()+"', '"+this.sg6.cells(0,i)+"', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-')");															
							}
						}
					}			
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from uin_d_skmpnen where thang='"+this.c_tahun.getText()+"' and kdgiat='"+this.kdgiat+"' and kdoutput='"+this.kdoutput+"' and kdsoutput='"+this.kdsoutput+"' and kdkmpnen= '"+this.kdkmpnen+"' and kdskmpnen ='"+this.cb_dkomp.getText()+"'");
					sql.add("delete from uin_d_akun where thang='"+this.c_tahun.getText()+"' and kdgiat='"+this.kdgiat+"' and kdoutput='"+this.kdoutput+"' and kdsoutput='"+this.kdsoutput+"' and kdkmpnen= '"+this.kdkmpnen+"' and kdskmpnen ='"+this.cb_dkomp.getText()+"'");

					sql.add("insert into uin_d_skmpnen(thang,kdsatker,kddept,kdunit,kdprogram,kdgiat,kdoutput,kdsoutput,kdkmpnen,kdskmpnen,urskmpnen) values "+
							"('"+this.c_tahun.getText()+"','"+this.kdsatker+"','"+this.kddept+"','"+this.kdunit+"','"+this.kdprogram+"','"+this.kdgiat+"','"+this.kdoutput+"','"+this.kdsoutput+"','"+this.kdkmpnen+"','"+this.cb_dkomp.getText()+"','"+this.e_nama.getText()+"')");							
					if (this.sg6.getRowValidCount() > 0){
						for (var i=0;i < this.sg6.getRowCount();i++){
							if (this.sg6.rowValid(i)){
								sql.add("insert into uin_d_akun(thang, kdjendok, kdsatker, kddept, kdunit, kdprogram, kdgiat, kdoutput, kdlokasi, kdkabkota, kddekon, kdsoutput, kdkmpnen, kdskmpnen, kdakun, kdkppn, kdbeban, kdjnsban, kdctarik, register, carahitung, prosenphln, prosenrkp, prosenrmp, kppnrkp, kppnrmp, kppnphln, regdam, kdluncuran, kdblokir, uraiblokir, kdib) values "+
										"('"+this.c_tahun.getText()+"', '-', '"+this.kdsatker+"', '"+this.kddept+"', '"+this.kdunit+"', '"+this.kdprogram+"', '"+this.kdgiat+"', '"+this.kdoutput+"', '-', '-', '-', '"+this.kdsoutput+"', '"+this.kdkmpnen+"', '"+this.cb_dkomp.getText()+"', '"+this.sg6.cells(0,i)+"', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-')");															
							}
						}
					}		
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from uin_d_skmpnen where thang='"+this.c_tahun.getText()+"' and kdgiat='"+this.kdgiat+"' and kdoutput='"+this.kdoutput+"' and kdsoutput='"+this.kdsoutput+"' and kdkmpnen= '"+this.kdkmpnen+"' and kdskmpnen ='"+this.cb_dkomp.getText()+"'");
					sql.add("delete from uin_d_akun where thang='"+this.c_tahun.getText()+"' and kdgiat='"+this.kdgiat+"' and kdoutput='"+this.kdoutput+"' and kdsoutput='"+this.kdsoutput+"' and kdkmpnen= '"+this.kdkmpnen+"' and kdskmpnen ='"+this.cb_dkomp.getText()+"'");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_dkomp);
				setTipeButton(tbAllFalse);				
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_dept && this.cb_dept.getText()!="") {
				this.cb_unit.setSQL("select kdunit, nmunit from uin_unit where kddept='"+this.cb_dept.getText()+"'",["kdunit","nmunit"],false,["Kode","Nama"],"and","Data Unit",true);
				this.cb_unit.setText(this.kdunit);				
			}			
			if (sender == this.cb_unit && this.cb_unit.getText()!="") {
				this.cb_prog.setSQL("select kdprogram, nmprogram from uin_program where kddept='"+this.cb_dept.getText()+"' and kdunit='"+this.cb_unit.getText()+"'",["kdprogram","nmprogram"],false,["Kode","Nama"],"and","Data Program",true);
				this.cb_prog.setText(this.kdprogram);				
			}
			if (sender == this.cb_prog && this.cb_prog.getText()!="") {
				this.doLoad();
			}
			if (sender==this.cb_dkomp && this.cb_dkomp.getText()!="") {
				var strSQL = "select urskmpnen as nama from uin_d_skmpnen where thang='"+this.c_tahun.getText()+"' and kdsatker='"+this.kdsatker+"' and kddept='"+this.kddept+"' and kdunit='"+this.kdunit+"' and kdprogram='"+this.kdprogram+"' and kdgiat='"+this.kdgiat+"' and kdoutput='"+this.kdoutput+"' and kdsoutput='"+this.kdsoutput+"' and kdkmpnen= '"+this.kdkmpnen+"' and kdskmpnen ='"+this.cb_dkomp.getText()+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);		
						
						var data = this.dbLib.getDataProvider("select a.kdakun,a.nmakun from uin_akun a inner join uin_d_akun b on a.kdakun=b.kdakun where b.thang='"+this.c_tahun.getText()+"' and b.kdsatker='"+this.kdsatker+"' and b.kddept='"+this.kddept+"' and b.kdunit='"+this.kdunit+"' and b.kdprogram='"+this.kdprogram+"' and b.kdgiat='"+this.kdgiat+"' and b.kdoutput='"+this.kdoutput+"' and b.kdsoutput='"+this.kdsoutput+"' and b.kdkmpnen= '"+this.kdkmpnen+"' and b.kdskmpnen ='"+this.cb_dkomp.getText()+"' ",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg6.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];													
								this.sg6.appendData([line.kdakun,line.nmakun]);
							}
						} else this.sg6.clear(1);
						
						setTipeButton(tbUbahHapus);
					}
					else{
						this.sg6.clear(1);
						this.e_nama.setText("");
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doSgBtnClick1: function(sender, col, row){
		try{
			if (col === 4) this.doDoubleClick(this.sg1,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{			
			if (this.sg1.cells(0,row) != "") {						
				this.pc1.setActivePage(this.pc1.childPage[1]);	
				this.kdgiat=this.sg1.cells(0,row);
				this.cb_giat.setText(this.sg1.cells(0,row),this.sg1.cells(1,row));
				var sql = "select kdoutput as kode,nmoutput as nama from uin_output where kdgiat='"+this.sg1.cells(0,row)+"' order by kdoutput ";
				var data2 = this.dbLib.getDataProvider(sql,true);		
				if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
					this.dataJU2 = data2;
					this.sgn2.setTotalPage(Math.ceil(data2.rs.rows.length/20));
					this.sgn2.rearrange();
					this.doTampilData2(1);
				} else this.sg2.clear(1);		
				
			}
		} catch(e) {alert(e);}
	},
	doTampilData2: function(page) {
		this.sg2.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU2.rs.rows.length? this.dataJU2.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU2.rs.rows[i];													
			this.sg2.appendData([line.kode,line.nama,"Pilih"]); 
		}
		this.sg2.setNoUrut(start);
	},
	doPager2: function(sender, page) {
		this.doTampilData2(page);
	},
	doSgBtnClick2: function(sender, col, row){
		try{
			if (col === 2) this.doDoubleClick2(this.sg2,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick2: function(sender, col , row) {
		try{			
			if (this.sg2.cells(0,row) != "") {						
				this.pc1.setActivePage(this.pc1.childPage[2]);	
				this.kdoutput=this.sg2.cells(0,row);	
				this.cb_out.setText(this.sg2.cells(0,row),this.sg2.cells(1,row));												
				var sql = "select kdsoutput as kode,nmsoutput as nama from uin_soutput where thang='"+this.c_tahun.getText()+"' and kdgiat='"+this.kdgiat+"' and kdoutput='"+this.sg2.cells(0,row)+"' order by kdsoutput ";				
				var data = this.dbLib.getDataProvider(sql,true);		
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn3.rearrange();
					this.doTampilData3(1);
				} else this.sg3.clear(1);		
				
			}
		} catch(e) {alert(e);}
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg3.appendData([line.kode,line.nama,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col === 2) this.doDoubleClick3(this.sg3,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{			
			if (this.sg3.cells(0,row) != "") {						
				this.pc1.setActivePage(this.pc1.childPage[3]);	
				this.kdsoutput=this.sg3.cells(0,row);	
				this.cb_dout.setText(this.sg3.cells(0,row),this.sg3.cells(1,row));																								
				var sql = "select kdkmpnen as kode,nmkmpnen as nama from uin_kmpnen where thang='"+this.c_tahun.getText()+"' and kdgiat='"+this.kdgiat+"' and kdoutput='"+this.kdoutput+"' and kdsoutput='"+this.sg3.cells(0,row)+"' order by kdkmpnen ";				
				var data = this.dbLib.getDataProvider(sql,true);		
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn4.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn4.rearrange();
					this.doTampilData4(1);
				} else this.sg4.clear(1);		
				
			}
		} catch(e) {alert(e);}
	},
	doTampilData4: function(page) {
		this.sg4.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg4.appendData([line.kode,line.nama,"Pilih"]); 
		}
		this.sg4.setNoUrut(start);
	},
	doPager4: function(sender, page) {
		this.doTampilData4(page);
	},
	doSgBtnClick4: function(sender, col, row){
		try{
			if (col === 2) this.doDoubleClick4(this.sg4,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick4: function(sender, col , row) {
		try{			
			if (this.sg4.cells(0,row) != "") {						
				this.pc1.setActivePage(this.pc1.childPage[4]);	
				this.kdkmpnen = this.sg4.cells(0,row);	
				this.cb_komp.setText(this.sg4.cells(0,row),this.sg4.cells(1,row));																																								
				var sql = "select a.kdskmpnen as kode,a.urskmpnen as nama "+
						  "from uin_d_skmpnen a "+
						  "where a.thang='"+this.c_tahun.getText()+"' and kdsatker='"+this.kdsatker+"' and kddept='"+this.kddept+"' and kdunit='"+this.kdunit+"' and kdprogram='"+this.kdprogram+"' and a.kdgiat='"+this.kdgiat+"' and a.kdoutput='"+this.kdoutput+"' and a.kdsoutput='"+this.kdsoutput+"' and a.kdkmpnen= '"+this.sg4.cells(0,row)+"' order by a.kdskmpnen ";									  
				var data = this.dbLib.getDataProvider(sql,true);		
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn5.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn5.rearrange();
					this.doTampilData5(1);
				} else this.sg5.clear(1);		
				
			}
		} catch(e) {alert(e);}
	},
	doTampilData5: function(page) {
		this.sg5.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg5.appendData([line.kode,line.nama,"Pilih"]); 
		}
		this.sg5.setNoUrut(start);
	},
	doPager5: function(sender, page) {
		this.doTampilData5(page);
	},	
	doSgBtnClick5: function(sender, col, row){
		try{
			if (col === 2) this.doDoubleClick5(this.sg5,0,row);						
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick5: function(sender, col , row) {
		try{			
			if (this.sg5.cells(0,row) != "") {						
				this.pc1.setActivePage(this.pc1.childPage[5]);																		
				this.cb_dkomp.setText(this.sg5.cells(0,row));	
				this.e_nama.setText(this.sg5.cells(1,row));					
			}
		} catch(e) {alert(e);}
	},
	doEllipsClick6: function(sender, col, row){
		try{			
			if (sender == this.sg6) {				
				if (col == 0){					
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
							"select kdakun,nmakun from uin_akun where kdjenbel ='5'",
							"select count(*) from uin_akun where kdjenbel ='5'",
							["kdakun","nmakun"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_dkomp.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},	
	doLoad:function(sender){
		var sql2="";var sql3="";		
		if (this.cb_dept.getText() != ""){
			sql2="where kddept='"+this.cb_dept.getText()+"' ";
			sql3="where kddept='"+this.cb_dept.getText()+"' ";
		}
		
		if (this.cb_dept.getText() != "" && this.cb_unit.getText()!="" ){
			sql2="where kddept='"+this.cb_dept.getText()+"' ";
			sql3="where kddept='"+this.cb_dept.getText()+"' and kdunit='"+this.cb_unit.getText()+"' ";
			
		}
			
		var sql = "select kddept as nu,kddept as kode,nmdept as nama,'' as kdfungsi,'' as kdsfung from uin_dept "+sql2+
				"union all "+
				"select kddept+kdunit as nu,kddept+'.'+kdunit as kode,nmunit as nama,'' as kdfungsi,'' as kdsfung from uin_unit  "+sql3+
				"union all "+
				"select kddept+kdunit+kdprogram as nu,kddept+'.'+kdunit+'.'+kdprogram as kode,nmprogram as nama,'' as kdfungsi,'' as kdsfung from uin_program  "+sql3+
				"union all "+
				"select kddept+kdunit+kdprogram+kdgiat as nu,kdgiat as kode,nmgiat as nama,kdfungsi,kdsfung from t_giat "+sql3+
				"order by nu ";		
		var data = this.dbLib.getDataProvider(sql,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode,line.nama,line.kdfungsi,line.kdsfung,"Pilih"]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
