window.app_saku3_transaksi_rkm_fTarget = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rkm_fTarget.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rkm_fTarget";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Target RKM", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"Tahun",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,120,20],caption:"Tanggal", underline:true});	
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,20],selectDate:[this,"doSelectDate"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,403], childPage:["Data Target RKM","Daftar Target RKM"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,
		            colTitle:["No. Bukti","Keterangan"],
					colWidth:[[1,0],[300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Nota",click:[this,"doLoad"]});		
		
		this.e_nb = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"No Bukti",maxLength:10,change:[this,"doChange"],readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});										
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,390,20],caption:"Keterangan", maxLength:50, tag:1});
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[5,12,993,322], childPage:["Data Target RKM"]});		
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:10,tag:0,
		            colTitle:["Kode PP","Nama PP","Kode Indikator","Keterangan","Kode Akun","Nama Akun","Q1","Q2","Q3","Q4"],					
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,100,100,150,80,150,80,150,80]],
					buttonStyle:[[4,2,0],[bsEllips,bsEllips,bsEllips]], 				
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],										
					columnReadOnly:[true,[1,3,5],[0,2,4, 6,7,8,9]],
					colFormat:[[6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan=1;
			this.doLoad();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rkm_fTarget.extend(window.childForm);
window.app_saku3_transaksi_rkm_fTarget.implement({
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);					
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if(this.stsSimpan == 0){
						sql.add("delete from rkm_target_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from rkm_target_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}	

					sql.add("insert into rkm_target_m(no_bukti,kode_lokasi,tanggal,tahun,keterangan) values "+
						    "	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.e_ket.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){	
								sql.add("insert into rkm_target_d (no_bukti,kode_lokasi,kode_pp,kode_ip,kode_akun,periode,nilai) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+this.period+"01',"+nilaiToFloat(this.sg.cells(6,i))+")");
										sql.add("insert into rkm_target_d (no_bukti,kode_lokasi,kode_pp,kode_ip,kode_akun,periode,nilai) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+this.period+"04',"+nilaiToFloat(this.sg.cells(7,i))+")");
										sql.add("insert into rkm_target_d (no_bukti,kode_lokasi,kode_pp,kode_ip,kode_akun,periode,nilai) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+this.period+"07',"+nilaiToFloat(this.sg.cells(8,i))+")");
										sql.add("insert into rkm_target_d (no_bukti,kode_lokasi,kode_pp,kode_ip,kode_akun,periode,nilai) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+this.period+"10',"+nilaiToFloat(this.sg.cells(9,i))+")");														
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
					sql.add("delete from rkm_target_m where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from rkm_target_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
				setTipeButton(tbSimpan);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.stsSimpan=1;
				this.doClick(this.i_gen);
				this.sg1.clear(1);
				this.sg.clear(1);
				this.doLoad();
				break;
			case "simpan" :	
			case "ubah" :
				
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){		
		var data = this.dbLib.getDataProvider("select year(getdate()) + 1 as tahun",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){				
				this.e_periode.setText(line.tahun);
				this.period = line.tahun;
			}
		}

		var sql = new server_util_arrayList();
		sql.add("select kode_pp,nama from rkm_pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'");				
		sql.add("select kode_ip,nama from rkm_ip where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_periode.getText()+"' ");
		sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag ='055' where a.kode_lokasi='"+this.app._lokasi+"' ");
		this.dbLib.getMultiDataProviderA(sql);
		
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);
		}
	},

	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rkm_target_m","no_bukti",this.app._lokasi+"-TG"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.stsSimpan=1;	
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);	
		}
	},
	
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));

				var strSQL = "select keterangan from rkm_target_m where no_bukti ='"+this.e_nb.getText()+"' and kode_lokasi= '"+this.app._lokasi+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.e_ket.setText(line.keterangan);
					}
				}

				var strSQL = "select a.no_bukti,a.kode_akun,a.kode_pp,a.kode_ip,b.nama as nama_pp,c.nama as nama_ip,d.nama as nama_akun,ISNULL(a.n1,0) as n1,ISNULL(a.n2,0) as n2,ISNULL(a.n3,0) as n3,ISNULL(a.n4,0) as n4 "+
							 "from "+
							 "(  select  a.no_bukti,a.kode_akun,a.kode_pp,a.kode_ip, "+
							 "		   SUM(case when SUBSTRING(a.periode,5,2)='01' then a.nilai else 0 end) as n1, "+
							 "		   SUM(case when SUBSTRING(a.periode,5,2)='04' then a.nilai else 0 end) as n2, "+
							 " 		   SUM(case when SUBSTRING(a.periode,5,2)='07' then a.nilai else 0 end) as n3, "+
							 "		   SUM(case when SUBSTRING(a.periode,5,2)='10' then a.nilai else 0 end) as n4 "+
							 "   from rkm_target_d a where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							 "   group by a.no_bukti,a.kode_akun,a.kode_pp,a.kode_ip) a "+
							 "inner join rkm_pp b on a.kode_pp = b.kode_pp "+
							 "inner join rkm_ip c on a.kode_ip = c.kode_ip "+
							 "inner join masakun d on a.kode_akun = d.kode_akun and d.kode_lokasi='"+this.app._lokasi+"' "+							
							 "order by a.kode_pp ";
	 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.kode_pp,line.nama_pp,line.kode_ip,line.nama_ip,line.kode_akun,line.nama_akun,floatToNilai(line.n1),floatToNilai(line.n2),floatToNilai(line.n3),floatToNilai(line.n4)]);
					}
				}									
			}
		} catch(e) {alert(e);}
	},

	// colTitle:["Kode PP","Nama PP","Kode Indikator","Keterangan","Kode Akun","Nama Akun","Q1","Q2","Q3","Q4"],					

	doChangeCell: function(sender, col, row){	
		sender.onChange.set(undefined,undefined);	   
		if (col == 0) {
			if (sender.cells(0,row) != "") {
				var pp = this.dataPP.get(sender.cells(0,row));
				if (pp) sender.cells(1,row,pp);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode PP "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}
		
		if (col == 2) {
			if (sender.cells(2,row) != "") {
				var ip = this.dataIP.get(sender.cells(2,row));
				if (ip) sender.cells(3,row,ip);
				else {
					if (trim(sender.cells(2,row)) != "") system.alert(this,"Kode Indikator "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}				
			}
		}

		if (col == 4) {
			if (sender.cells(4,row) != "") {
				var akun = this.dataAkun.get(sender.cells(4,row));
				if (akun) sender.cells(5,row,akun);
				else {
					if (trim(sender.cells(4,row)) != "") system.alert(this,"Kode Akun "+sender.cells(4,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(4,row,"");
					sender.cells(5,row,"");
				}				
			}
		}

		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar PP",sender,undefined, 
												  "select kode_pp,nama from rkm_pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
												  "select count(*) from rkm_pp where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'",
												  ["kode_pp","nama"],"and",["Kode PP","Nama PP"],false);				
				}
				if (col == 2){
					this.standarLib.showListData(this, "Daftar Indikator Penilaian",sender,undefined, 
												  "select kode_ip,nama from rkm_ip where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_periode.getText()+"' and kode_pp='"+sender.cells(0,row)+"'",
												  "select count(*) from rkm_ip where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.e_periode.getText()+"' and kode_pp='"+sender.cells(0,row)+"'",
												  ["kode_ip","nama"],"and",["Kode IP","Nama IP"],false);				
				}
				if (col == 4){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag ='055' where a.kode_lokasi='"+this.app._lokasi+"' ",
												  "select count(*) from (select a.kode_akun from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag ='055' where a.kode_lokasi='"+this.app._lokasi+"') a ",
												  ["a.kode_akun","a.nama"],"and",["Kode Akun","Nama Akun"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
					break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
						
							this.dataPP = new portalui_arrayMap();								
							this.dataIP = new portalui_arrayMap();														
							this.dataAkun = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataPP.set(line.kode_pp, line.nama);										
								}								
							}							
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];
									this.dataIP.set(line.kode_ip, line.nama);
								}
							}
							if (result.result[2]){	    			        
								var line;
								for (var i in result.result[2].rs.rows){
									line = result.result[2].rs.rows[i];
									this.dataAkun.set(line.kode_akun, line.nama);
								}
							}
						}else throw result;
					break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},

	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.doLoad();
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},

	doLoad:function(sender){						
		var strSQL = "select no_bukti,keterangan from rkm_target_m where kode_lokasi='"+this.app._lokasi+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
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
			this.sg1.appendData([line.no_bukti,line.keterangan]); 
		}
		this.sg1.setNoUrut(start);

	},

	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
