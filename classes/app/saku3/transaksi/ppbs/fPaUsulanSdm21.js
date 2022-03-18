window.app_saku3_transaksi_ppbs_fPaUsulanSdm21 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_fPaUsulanSdm21.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ppbs_fPaUsulanSdm21";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Usulan : Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		
		this.pc1 = new pageControl(this,{bound:[10,12,1000,460], childPage:["Daftar Usulan","Data Usulan","Filter Cari"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:7,tag:9,
		             colTitle:["No Bukti","Tanggal","Keterangan","Tahun","Nik App","Kode PP","Nama PP"],
					 colWidth:[[6,5,4,3,2,1,0],[200,80,80,80,250,80,100]],readOnly:true,
					 dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});

		this.c_tahun = new saiCB(this.pc1.childPage[1],{bound:[20,22,200,20],caption:"Tahun",readOnly:true,tag:2, change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_app = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.cb_pp = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"Kode PP", multiSelection:false, maxLength:10, tag:2});
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[780,16,200,20],caption:"Total Usulan", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.c_tahun2 = new saiCB(this.pc1.childPage[2],{bound:[20,13,200,20],caption:"Tahun",readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_pp2 = new portalui_saiCBBL(this.pc1.childPage[2],{bound:[20,17,220,20],caption:"Kode PP",tag:2,multiSelection:false});
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,16,98,18],caption:"Cari Data",click:[this,"doCari"]});
		
		this.p1 = new panel(this.pc1.childPage[1],{bound:[2,23,995,308],caption:"Daftar Usulan SDM"});							
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:18,tag:0,
					colTitle:["NIK","Nama",  
							  "Gaji Dasar","Tunj. Dasar","Tunj. Struktural","Tunj Premium","Tunj Fungsional","Tunj Kehormatan","THT",
							  "Tunj Pajak","Pakser","Tunj Jamsostek","Tunj JP","Tunj JamKes","Kelebihan SKS","Uang Makan","Insentif Kinerja","THR"],
					colWidth:[[17,16,15,14, 13,12,11,10,9,8 ,7,6,5,4,3,2 ,1,0],[80,80,80,80,  80,80,80,80,80,80,  80,80,80,80,80,80,   200,80]],		
					colFormat:[[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,  cfNilai,cfNilai,cfNilai,cfNilai]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"' ",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			this.cb_pp.setSQL("select kode_pp, nama from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'",["kode_pp","nama"],false,["NIK","Nama"],"and","Data PP",true);
			this.cb_pp2.setSQL("select kode_pp, nama from agg_pp where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.c_tahun.getText()+"'",["kode_pp","nama"],false,["NIK","Nama"],"and","Data PP",true);

			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}		
			this.c_tahun2.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun2.addItem(i,line.tahun);
				}
			}	
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ppbs_fPaUsulanSdm21.extend(window.childForm);
window.app_saku3_transaksi_ppbs_fPaUsulanSdm21.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();
			this.doNilaiChange();
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
	},
	doCari:function(sender){								
		try {
			var filter = "";
			if (this.cb_pp2.getText() != "") var filter = filter+" and a.kode_pp = '"+this.cb_pp2.getText()+"' ";
			var strSQL = "select a.no_gaji,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.tahun,a.nik_app,a.kode_pp,b.nama as nama_pp "+
		            	 "from agg_gaji_m a "+
					 	 "inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
					 	 "where a.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.c_tahun.getText()+"' "+filter+" order by a.no_gaji ";		
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
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
					var tahun=this.c_tahun.getText();
					sql.add("insert into agg_gaji_m( no_gaji, kode_lokasi, tahun,tanggal, keterangan, nik_buat, nik_app, tgl_input, nik_user,kode_pp) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+tahun+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._userLog+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_pp.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into agg_gaji_load(nu,no_gaji,kode_lokasi,nik,nama, 	n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16) values "+
										"("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"',"+
										nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+","+
										nilaiToFloat(this.sg.cells(8,i))+","+nilaiToFloat(this.sg.cells(9,i))+","+nilaiToFloat(this.sg.cells(10,i))+","+nilaiToFloat(this.sg.cells(11,i))+","+nilaiToFloat(this.sg.cells(12,i))+","+nilaiToFloat(this.sg.cells(13,i))+","+										
										nilaiToFloat(this.sg.cells(14,i))+","+nilaiToFloat(this.sg.cells(15,i))+","+nilaiToFloat(this.sg.cells(16,i))+","+nilaiToFloat(this.sg.cells(17,i))+")");																	
							}
						}
					}
									
					sql.add("exec sp_agg_gaji_d21 '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"'");
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
					var tahun=this.c_tahun.getText();
					sql.add("delete from agg_gaji_m where no_gaji = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from agg_gaji_d where no_gaji = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from agg_gaji_load where no_gaji = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from agg_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into agg_gaji_m( no_gaji, kode_lokasi, tahun,tanggal, keterangan, nik_buat, nik_app, tgl_input, nik_user,kode_pp) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+tahun+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._userLog+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_pp.getText()+"')");
						
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into agg_gaji_load(nu,no_gaji,kode_lokasi,nik,nama, 	n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16,n17) values "+
										"("+i+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"',"+
										nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(7,i))+","+
										nilaiToFloat(this.sg.cells(8,i))+","+nilaiToFloat(this.sg.cells(9,i))+","+nilaiToFloat(this.sg.cells(10,i))+","+nilaiToFloat(this.sg.cells(11,i))+","+nilaiToFloat(this.sg.cells(12,i))+","+nilaiToFloat(this.sg.cells(13,i))+","+										
										nilaiToFloat(this.sg.cells(14,i))+","+nilaiToFloat(this.sg.cells(15,i))+","+nilaiToFloat(this.sg.cells(16,i))+","+nilaiToFloat(this.sg.cells(17,i))+")");																	
							}
						}
					}
					sql.add("exec sp_agg_gaji_d21 '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"'");
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
					sql.add("delete from agg_gaji_m where no_gaji = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from agg_gaji_d where no_gaji = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from agg_gaji_load where no_gaji = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from agg_d where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
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
			if (this.cb_pp.getText() != ""){
				this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a "+
									"inner join agg_akun_pp b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									"where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_pp='"+this.cb_pp.getText()+"' and b.tahun='"+this.c_tahun.getText()+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun",true);
				this.cb_rkm.setSQL("select kode_rkm, nama from agg_rkm where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"' and tahun='"+this.c_tahun.getText()+"'",["kode_rkm","nama"],false,["Kode","Nama"],"and","Data RKM",true);

			}
			if (this.cb_rkm.getText() != ""){
				this.cb_drk.setSQL("select kode_drk, nama from agg_drk where kode_lokasi='"+this.app._lokasi+"' and kode_rkm='"+this.cb_rkm.getText()+"' ",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);

			}
			
			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doSelectDate: function(sender, y,m,d){
		this.c_tahun.setText(y+1);
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1);this.sg4.clear(1);
				this.e_nilai.setText("0");
				this.bTampil.show();				
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_gaji_m","no_gaji",this.app._lokasi+"-SDM"+this.c_tahun.getText()+".","0000"));
			
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.e_nb.setText(this.sg1.cells(0,row));	
				this.dp_d1.setText(this.sg1.cells(1,row));					
				this.e_ket.setText(this.sg1.cells(2,row));
				this.cb_app.setText(this.sg1.cells(4,row));
				this.cb_pp.setText(this.sg1.cells(5,row));		
				var strSQL = " select no_gaji, kode_lokasi, nik, nama, n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16 "+
							 " from agg_gaji_load "+
							 " where no_gaji = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu ";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.nik,line.nama
						,floatToNilai(line.n1),floatToNilai(line.n2),floatToNilai(line.n3),floatToNilai(line.n4),floatToNilai(line.n5),floatToNilai(line.n6)
						,floatToNilai(line.n7),floatToNilai(line.n8),floatToNilai(line.n9),floatToNilai(line.n10),floatToNilai(line.n11),floatToNilai(line.n12)
						,floatToNilai(line.n13),floatToNilai(line.n14),floatToNilai(line.n15),floatToNilai(line.n16)]);
					}
					this.sg.validasi();
				} else this.sg.clear(1);	
				
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select a.no_gaji,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.tahun,a.nik_app,a.kode_pp,b.nama as nama_pp "+
		             "from agg_gaji_m a "+
					 "inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.c_tahun.getText()+"' order by a.no_gaji ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_gaji,line.tgl,line.keterangan,line.tahun,line.nik_app,line.kode_pp,line.nama_pp]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doNilaiChange: function(){
		try{
			var tot=0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) != ""){
					tot +=  nilaiToFloat(this.sg.cells(2,i)) + nilaiToFloat(this.sg.cells(3,i)) + nilaiToFloat(this.sg.cells(4,i)) + nilaiToFloat(this.sg.cells(5,i)) + 
				            nilaiToFloat(this.sg.cells(6,i)) + nilaiToFloat(this.sg.cells(7,i)) + nilaiToFloat(this.sg.cells(8,i)) + nilaiToFloat(this.sg.cells(9,i)) +
							nilaiToFloat(this.sg.cells(10,i)) + nilaiToFloat(this.sg.cells(11,i)) + nilaiToFloat(this.sg.cells(12,i)) + nilaiToFloat(this.sg.cells(13,i)) + 
							nilaiToFloat(this.sg.cells(14,i)) + nilaiToFloat(this.sg.cells(15,i)) + nilaiToFloat(this.sg.cells(16,i)) + nilaiToFloat(this.sg.cells(17,i));					
				}
			}
			this.e_total.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doChangeCell: function(sender, col, row) {
		if (col ==  2 || col ==  3  || col ==  4 || col == 5  || col == 6 || col == 7 || col == 8 || col == 9 || col == 10 || col == 11 || col == 12 || col == 13 || col == 14 || col == 15 || col == 16 || col == 17) {								
			if (sender.cells(2,row)  != "" && sender.cells(3,row)   != "" && sender.cells(4,row)   != "" && sender.cells(5,row)   != "" && sender.cells(6,row)   != "" && sender.cells(7,row) != "" && 
				sender.cells(8,row)  != "" && sender.cells(9,row)   != "" && sender.cells(10,row)  != "" && sender.cells(11,row)  != "" && sender.cells(12,row) != "" && sender.cells(13,row) != "" &&  
				sender.cells(14,row) != "" &&  sender.cells(15,row) != "" &&  sender.cells(16,row) != "" &&  sender.cells(17,row) != "") {

				var total = nilaiToFloat(sender.cells(2,row))  + nilaiToFloat(sender.cells(3,row))  + nilaiToFloat(sender.cells(4,row))  + nilaiToFloat(sender.cells(5,row))  + nilaiToFloat(sender.cells(6,row))  + nilaiToFloat(sender.cells(7,row))  + 
							nilaiToFloat(sender.cells(8,row))  + nilaiToFloat(sender.cells(9,row))  + nilaiToFloat(sender.cells(10,row)) + nilaiToFloat(sender.cells(11,row)) + nilaiToFloat(sender.cells(12,row)) + nilaiToFloat(sender.cells(13,row)) + 
							nilaiToFloat(sender.cells(14,row)) + nilaiToFloat(sender.cells(15,row)) + nilaiToFloat(sender.cells(16,row)) + nilaiToFloat(sender.cells(17,row));				
			}
			sender.validasi();
		}
		
	}
});