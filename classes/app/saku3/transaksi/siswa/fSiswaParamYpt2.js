window.app_saku3_transaksi_siswa_fSiswaParamYpt2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fSiswaParamYpt2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fSiswaParamYpt2";
		this.itemsValue = new arrayList();
		this.maximize();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Setup Parameter Billing Siswa", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
	
		this.cb_pp = new saiCBBL(this,{bound:[20,10,200,20],caption:"Sekolah", readOnly:true, tag:2});	
		
		this.pc1 = new pageControl(this,{bound:[5,12,890,430], childPage:["Filter Setup","Parameter Billing"]});
		this.cb_tingkat = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Tingkat", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_akt = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Angkatan", multiSelection:false, maxLength:10, tag:2});				
		this.cb_jur = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"Jurusan", multiSelection:false, maxLength:10, tag:2});				

		this.cb_ta = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Tahun Ajaran", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		
		this.c_tahun1 = new saiCB(this.pc1.childPage[0],{bound:[20,13,180,20],caption:"Periode Awal",readOnly:true,tag:2});
		this.c_bulan1 = new saiCB(this.pc1.childPage[0],{bound:[205,13,40,20],labelWidth:0,caption:"",items:["01","02","03","04","05","06","07","08","09","10","11","12"], readOnly:true,tag:2});
		this.c_tahun2 = new saiCB(this.pc1.childPage[0],{bound:[20,14,180,20],caption:"Periode Akhir",readOnly:true,tag:2});
		this.c_bulan2 = new saiCB(this.pc1.childPage[0],{bound:[205,14,40,20],labelWidth:0,caption:"",items:["01","02","03","04","05","06","07","08","09","10","11","12"], readOnly:true,tag:2});
		this.bTampil = new button(this.pc1.childPage[0],{bound:[120,13,80,18],caption:"Data Param",click:[this,"doLoadParam"]});			

		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:0,				
				colTitle:["Kode","Nama","Tarif","Periode Awal","Periode Akhir"],
				colWidth:[[4,3,2,1,0],[100,100,80,300,120]],
				columnReadOnly:[true,[0,1,2,3,4],[]],				
				colFormat:[[2],[cfNilai]],				
				defaultRow:1,autoAppend:true});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});				
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);			
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_tingkat.setSQL("select kode_tingkat, nama from sis_tingkat where kode_lokasi ='"+this.app._lokasi+"'",["kode_tingkat","nama"],false,["Kode","Nama"],"and","Data Tingkat",true);
			this.cb_akt.setSQL("select kode_akt, nama from sis_angkat where flag_aktif='1' and kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_akt","nama"],false,["Kode","Nama"],"and","Data Angkatan",true);
			this.cb_jur.setSQL("select kode_jur, nama from sis_jur where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_jur","nama"],false,["Kode","Nama"],"and","Data Jurusan",true);
			
			this.cb_ta.setSQL("select kode_ta, nama from sis_ta where flag_aktif='1' and kode_pp='"+this.app._kodePP+"' and kode_lokasi ='"+this.app._lokasi+"'",["kode_ta","nama"],false,["Kode","Nama"],"and","Data Tahun Ajar",true);

			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);	

			var sql = new server_util_arrayList();
			sql.add("select kode_param,nama from sis_param where kode_lokasi = '"+this.app._lokasi+"'");		
			this.dbLib.getMultiDataProviderA(sql);
			
			this.c_tahun1.items.clear();
			this.c_tahun2.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun1.addItem(i,line.tahun);
					this.c_tahun2.addItem(i,line.tahun);
				}
			}
			
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.c_tahun1.setText(line.tahun);
			}

			this.c_tahun1.setText("");
			this.c_tahun2.setText("");
			this.c_bulan1.setText("");
			this.c_bulan2.setText("");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siswa_fSiswaParamYpt2.extend(window.childForm);
window.app_saku3_transaksi_siswa_fSiswaParamYpt2.implement({
	doLoadParam: function(sender) {
		if (this.cb_akt.getText()!="" && this.cb_tingkat.getText()!="" && this.cb_jur.getText()!="" && this.cb_ta.getText()!="" && this.c_tahun1.getText()!="" && this.c_tahun2.getText()!="" && this.c_bulan1.getText()!="" && this.c_bulan2.getText()!="") {
			var perAwal = this.c_tahun1.getText() + this.c_bulan1.getText();
			var perAkhir = this.c_tahun2.getText() + this.c_bulan2.getText();

			var strSQL = "select a.kode_param,a.nama,isnull(b.tarif ,0) as tarif "+
					"from sis_param a "+
					"left join sis_param_tarif b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi "+
					"			and b.kode_akt='"+this.cb_akt.getText()+"' and b.kode_jur='"+this.cb_jur.getText()+
					"' 		    and b.kode_tingkat='"+this.cb_tingkat.getText()+"' and b.kode_pp='"+this.app._kodePP+"' "+	
					"where a.kode_lokasi = '"+this.app._lokasi+"' order by a.idx "; 	
				
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.kode_param,line.nama,floatToNilai(line.tarif),perAwal,perAkhir]);
				}
			}
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
		else system.alert(this,"Filter Setup tidak lengkap.","Lengkapi Filter Parameter");
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
					
					var listParam = "";
					for (var i=0;i < this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i) && this.sg1.cells(2,i)!= "0"){
							listParam += ",'"+this.sg1.cells(0,i)+"'";				
						}
					}
					listParam = listParam.substr(1);	
		
					if (listParam != ""){
						sql.add("delete from sis_siswa_tarif where kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nis in "+
								"( "+
								"    select a.nis from sis_siswa a inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
								"    where a.kode_akt='"+this.cb_akt.getText()+"' and b.kode_tingkat='"+this.cb_tingkat.getText()+"' "+
								"    and b.kode_jur='"+this.cb_jur.getText()+"' and b.kode_pp = '"+this.cb_pp.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' "+
								") ");
						
						sql.add("insert into sis_siswa_tarif(nis,kode_kelas,kode_param,per_awal,per_akhir,tarif,kode_lokasi,kode_pp,kode_akt) "+
								"select a.nis,c.kode_kelas,b.kode_param,'"+this.c_tahun1.getText()+this.c_bulan1.getText()+"','"+this.c_tahun2.getText()+this.c_bulan2.getText()+"',b.tarif,a.kode_lokasi,'"+this.cb_pp.getText()+"',a.kode_akt "+
								"from sis_siswa a inner join sis_param_tarif b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.kode_kelas=b.kode_kelas and a.kode_akt=b.kode_akt and b.kode_param in ("+listParam+") "+
								"                 inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
								"where a.flag_aktif='1' and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and c.kode_jur='"+this.cb_jur.getText()+"' and a.kode_akt='"+this.cb_akt.getText()+"' and c.kode_tingkat='"+this.cb_tingkat.getText()+"' ");						
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) 
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;						
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.cb_tingkat && this.cb_tingkat.getText() != "") {			
				var data = this.dbLib.getDataProvider("select top 1 kode_akt from sis_angkat where kode_pp='"+this.app._kodePP+"' and kode_tingkat ='"+this.cb_tingkat.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_akt.setText(line.kode_akt);
					}
				}
			}

			if (sender == this.cb_ta && this.cb_ta.getText() != "") {		
				var data = this.dbLib.getDataProvider("select convert(varchar,tgl_mulai,112) as awal,convert(varchar,tgl_akhir,112) as akhir from sis_ta where kode_ta='"+this.cb_ta.getText()+"' and kode_pp ='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.c_tahun1.setText(line.awal.substr(0,4));
						this.c_bulan1.setText(line.awal.substr(4,2));

						this.c_tahun2.setText(line.akhir.substr(0,4));
						this.c_bulan2.setText(line.akhir.substr(4,2));
					}
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      							
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});