window.app_saku3_transaksi_tarbak_simak_fSiswa = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_simak_fSiswa.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_simak_fSiswa";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Siswa", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.cb_pp = new saiCBBL(this,{bound:[20,13,220,20],caption:"PP / Unit", readOnly:true, maxLength:10, tag:2});
		this.c_flag2 = new saiCBBL(this,{bound:[20,22,220,20],caption:"Filter Status", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});

		this.pc1 = new pageControl(this,{bound:[20,12,1000,420], childPage:["Daftar Siswa","Data Siswa","Filter Cari"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["NIS","Nama","PP","Angkatan","Kelas"],
					colWidth:[[4,3,2,1,0],[150,150,200,200,150]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"NIS",maxLength:20,change:[this,"doChange"]});		
		this.e_id = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,33,220,20],caption:"ID Bank", maxLength:100, tag:1});								
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1,change:[this,"doChange"]});	
		this.cb_akt = new saiCBBL(this.pc1.childPage[1],{bound:[20,13,240,20],caption:"Angkatan", multiSelection:false, maxLength:10, tag:1});		
		
		this.cb_kelas = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,240,20],caption:"Kelas", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.cb_jur = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,240,20],caption:"Jurusan", readOnly:true, tag:1});
		this.cb_tingkat = new saiCBBL(this.pc1.childPage[1],{bound:[20,14,240,20],caption:"Tingkat", readOnly:true, tag:1});
		
		this.c_flag = new saiCBBL(this.pc1.childPage[1],{bound:[20,22,240,20],caption:"Status Siswa", multiSelection:false, maxLength:10, tag:2});
		this.e_tlulus = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,24,220,20],caption:"Tgl. Lulus", maxLength:50, tag:1});	

		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-10,172],colCount:5,tag:0,				
			colTitle:["Kode","Nama","Tarif","Periode Awal","Periode Akhir"],
			colWidth:[[4,3,2,1,0],[100,100,80,300,120]],
			columnReadOnly:[true,[1],[0,2,3,4]],			
			buttonStyle:[[0,3,4],[bsEllips,bsAuto,bsAuto]], 	
			colFormat:[[2],[cfNilai]],				
			ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],
			defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});				

		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"NIS",maxLength:30,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
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
			this.stsSimpan = 1;
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);						
			
			this.c_flag.setSQL("select kode_ss, nama from sis_siswa_status where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_ss","nama"],false,["Kode","Nama"],"and","Data Status",true);
			this.c_flag2.setSQL("select kode_ss, nama from sis_siswa_status where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_ss","nama"],false,["Kode","Nama"],"and","Data Status",true);

			this.cb_tingkat.setSQL("select kode_tingkat, nama from sis_tingkat where kode_lokasi='"+this.app._lokasi+"'",["kode_tingkat","nama"],false,["Kode","Nama"],"and","Data Tingkat",true);
			this.cb_jur.setSQL("select kode_jur, nama from sis_jur where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_jur","nama"],false,["Kode","Nama"],"and","Data Jurusan",true);
			this.cb_kelas.setSQL("select kode_kelas, nama from sis_kelas where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_kelas","nama"],false,["Kode","Nama"],"and","Data Kelas",true);
			this.cb_akt.setSQL("select kode_akt, nama from sis_angkat where flag_aktif='1' and kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' ",["kode_akt","nama"],false,["Kode","Nama"],"and","Data Angkatan",true);

			var sql = new server_util_arrayList();
			sql.add("select kode_param,nama from sis_param where kode_lokasi = '"+this.app._lokasi+"'");						
			this.dbLib.getMultiDataProviderA(sql);

			this.doLoadPeriodeTA();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_simak_fSiswa.extend(window.childForm);
window.app_saku3_transaksi_tarbak_simak_fSiswa.implement({
	doLoadPeriodeTA : function() {
		var data = this.dbLib.getDataProvider("select substring(convert(varchar,tgl_mulai,112),1,6) as bulanawal, substring(convert(varchar,tgl_akhir,112),1,6) as bulanakhir "+
												"from sis_ta "+
												"where flag_aktif ='1' and kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){
				this.perAwal = line.bulanawal;
				this.perAkhir = line.bulanakhir;
			}
		}

		this.sg.columns.get(3).pickList.clear();
		this.sg.columns.get(4).pickList.clear();
		var j=ix=0;
		for (var i=1;i < 13;i++){
			ix=i;
			if (i <= 9) var bulan = "0"+ix.toString();
			else var bulan = ix.toString();

			if (i > 6) this.sg.columns.get(3).pickList.set(j, this.perAwal.substr(0,4)+bulan);
			else this.sg.columns.get(4).pickList.set(j, this.perAkhir.substr(0,4)+bulan);				

			j++;
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
					sql.add("insert into sis_siswa(nis,kode_lokasi,nama,flag_aktif,kode_kelas,kode_pp,kode_akt,id_bank,tgl_lulus) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.c_flag.getText()+"','"+this.cb_kelas.getText()+"','"+this.app._kodePP+"','"+this.cb_akt.getText()+"','"+this.e_id.getText()+"','"+this.e_tlulus.getText()+"')");

					for (var i=0;i < this.sg.getRowCount();i++){		
						if (nilaiToFloat(this.sg.cells(2,i)) > 0) {	
							sql.add("insert into sis_siswa_tarif(nis,kode_kelas,kode_param,per_awal,per_akhir,tarif,kode_lokasi,kode_pp,kode_akt) values "+
									"('"+this.cb_kode.getText()+"','"+this.cb_kelas.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+",'"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_akt.getText()+"')");		
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

					sql.add("delete from sis_siswa_tarif where nis='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'");					
					sql.add("delete from sis_siswa where nis='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'");				

					sql.add("insert into sis_siswa(nis,kode_lokasi,nama,flag_aktif,kode_kelas,kode_pp,kode_akt,id_bank,tgl_lulus) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.c_flag.getText()+"','"+this.cb_kelas.getText()+"','"+this.app._kodePP+"','"+this.cb_akt.getText()+"','"+this.e_id.getText()+"','"+this.e_tlulus.getText()+"')");

					for (var i=0;i < this.sg.getRowCount();i++){	
						if (nilaiToFloat(this.sg.cells(2,i)) > 0) {	
							sql.add("insert into sis_siswa_tarif(nis,kode_kelas,kode_param,per_awal,per_akhir,tarif,kode_lokasi,kode_pp,kode_akt) values "+
									"('"+this.cb_kode.getText()+"','"+this.cb_kelas.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+",'"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.cb_akt.getText()+"')");		
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
					sql.add("delete from sis_siswa_tarif where nis='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'");					
					sql.add("delete from sis_siswa where nis='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'");										
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);					
					this.doLoad();
					setTipeButton(tbAllFalse);
				}
				break;
			case "simpan" :	
				var data = this.dbLib.getDataProvider("select nis from sis_siswa where id_bank ='"+this.e_id.getText()+"' and nis<>'"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						system.alert(this,"Transaksi tidak valid.","ID Bank Duplikasi dengan NIS Lain : "+line.nis);
						return false;						
					}
					else this.simpan();					
				}				
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :					
				var data = this.dbLib.getDataProvider("select nis from sis_siswa where id_bank ='"+this.e_id.getText()+"' and nis <> '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						system.alert(this,"Transaksi tidak valid.","ID Bank Duplikasi dengan NIS Lain : "+line.nis);
						return false;						
					}
					else this.ubah();													
				}					
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doLoadParam : function(sender){		
		if (this.cb_akt.getText() != "" && this.cb_jur.getText() != "" && this.cb_tingkat.getText() != "") {
			if (this.stsSimpan == 1) {
				var strSQL = "select a.kode_param,a.nama,isnull(b.tarif ,0) as tarif,isnull(b.bulan1 ,'-') as bulan1, isnull(b.bulan2 ,'-') as bulan2 "+
							"from sis_param a "+	
							"left join sis_param_tarif b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
							"			and b.kode_akt='"+this.cb_akt.getText()+"' and b.kode_jur='"+this.cb_jur.getText()+
							"' 		and b.kode_tingkat='"+this.cb_tingkat.getText()+"' and b.kode_pp='"+this.cb_pp.getText()+"' "+	
							"where a.kode_lokasi = '"+this.app._lokasi+"' order by a.idx "; 					
			}
			else {
				if (this.cb_kode.getText() != "") {
					var strSQL = "select a.kode_param,a.nama,isnull(b.tarif ,0) as tarif,isnull(b.per_awal ,'-') as bulan1, isnull(b.per_akhir ,'-') as bulan2 "+
								"from sis_param a "+	
								"left join sis_siswa_tarif b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi and b.nis='"+this.cb_kode.getText()+"' "+
								"where a.kode_lokasi = '"+this.app._lokasi+"' "+
								"order by a.idx "; 					
				}
			}

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_param,line.nama,floatToNilai(line.tarif),line.bulan1,line.bulan2]);
				}
			}
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.c_flag2 && this.c_flag2.getText()!="") {
				this.doLoad();
			}			
			if (sender == this.cb_kelas && this.cb_kelas.getText() != "" && this.cb_pp.getText() != "") {						
				var data = this.dbLib.getDataProvider("select kode_tingkat,kode_jur from sis_kelas where kode_kelas='"+this.cb_kelas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.cb_tingkat.setText(line.kode_tingkat);	
						this.cb_jur.setText(line.kode_jur);								
						this.doLoadParam();							
					}					
				}
			}
			
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				//setTipeButton(tbUbah);
				var data = this.dbLib.getDataProvider("select * from sis_siswa where nis='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.stsSimpan = 0;			
						this.e_nama.setText(line.nama);
						this.e_id.setText(line.id_bank);
						this.cb_pp.setText(line.kode_pp);	
						this.cb_kelas.setText(line.kode_kelas);
						this.cb_akt.setText(line.kode_akt);
						this.c_flag.setText(line.flag_aktif);						
						this.e_tlulus.setText(line.tgl_lulus);	
						
						this.doLoadParam();	
						setTipeButton(tbUbah);
					}
					else {
						this.stsSimpan = 1;			
						setTipeButton(tbSimpan);
					}
				}				
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Murid/Siswa",sender,undefined, 
											  "select nis, nama  from sis_siswa where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
											  "select count(nis) from sis_siswa where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
											  ["nis","nama"],"and",["NIS","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (sender.cells(0,row) != "") {				
				var param = this.dataParam.get(sender.cells(0,row));				
				if (param) sender.cells(1,row,param);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Param "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkParam");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}					
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Parameter",sender,undefined, 
							"select kode_param,nama from sis_param where kode_lokasi = '"+this.app._lokasi+"'",
							"select count(*) from sis_param where kode_lokasi = '"+this.app._lokasi+"'",
							["kode_param","nama"],"and",["Kode","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");														
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
					break;	      		
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataParam = new portalui_arrayMap();																					
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataParam.set(line.kode_param, line.nama);										
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
	doCari:function(sender){								
		try {
			if (this.e_kode2.getText() != "") var filter = " a.nis like '%"+this.e_kode2.getText()+"%' and ";
			else var filter = " a.nama like '%"+this.e_nama2.getText()+"%' and ";
			
			var strSQL = "select a.nis,a.nama,a.kode_pp,a.kode_akt,a.kode_kelas "+
						 "from sis_siswa a "+					 
						 "where "+filter+" a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.app._kodePP+"' order by a.nis";				
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
	doLoad:function(sender){								
		try {
			var strSQL = "select a.nis,a.nama,a.kode_kelas,a.kode_akt,a.kode_pp "+
						 "from sis_siswa a "+					 
						 "where flag_aktif='"+this.c_flag2.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.app._kodePP+"' order by a.nis";				
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
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg1.appendData([line.nis,line.nama,line.kode_pp,line.kode_akt,line.kode_kelas]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbah);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				
			}
		} catch(e) {alert(e);}
	}
});