window.app_hris_transaksi_adm_fSpj = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_adm_fSpj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_adm_fSpj";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan SPPD: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No SPPD",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.cb_spj = new saiCBBL(this,{bound:[20,13,200,20],caption:"Jenis SPPD", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"Keterangan", maxLength:100});		
		this.cb_loker = new saiCBBL(this,{bound:[20,19,200,20],caption:"Loker", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.e_ut = new saiLabelEdit(this,{bound:[720,16,200,20],caption:"Nilai Transport", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:1});
		this.e_uh = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Nilai Harian", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new panel(this,{bound:[20,23,900,203],caption:"Daftar Biaya Transportasi"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,895,150],colCount:6,tag:0,
		            colTitle:["Kode Rute","Nama","Tarif","Tempat Asal","Tempat Tujuan","Jenis Angkutan"],
					colWidth:[[5,4,3,2,1,0],[180,180,180,80,150,70]],
					columnReadOnly:[true,[0,1,2],[3,4,5]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[2],[cfNilai]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,175,899,25],buttonStyle:2,grid:this.sg});

		this.p2 = new panel(this,{bound:[20,24,900,203],caption:"Daftar Uang Harian"});
		this.sg2 = new saiGrid(this.p2,{bound:[1,20,895,150],colCount:5,tag:0,
		            colTitle:["Tanggal Berangkat","Tanggal Tiba","Lama Hari","Tarif","Nilai"],
					colWidth:[[4,3,2,1,0],[380,100,120,120,120]],
					columnReadOnly:[true,[3,4],[0,1,2]],
					colFormat:[[0,1,3,4],[cfDate,cfDate,cfNilai,cfNilai]],
					buttonStyle:[[0,1],[bsDate,bsDate]], 
					defaultRow:1,
					change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.p2,{bound:[1,175,899,25],buttonStyle:2,grid:this.sg2});

		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.nilai_uh = 0;
			this.cb_spj.setSQL("select sts_spj, nama from gr_status_spj where kode_lokasi='"+this.app._lokasi+"'",["sts_spj","nama"],false,["Kode","Nama"],"and","Data Jenis SPPD",true);
			this.cb_loker.setSQL("select kode_loker, nama from gr_loker where kode_lokasi='"+this.app._lokasi+"'",["kode_loker","nama"],false,["Kode","Nama"],"and","Data Lokasi Kerja",true);
			this.cb_app.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			this.cb_buat.setSQL("select nik, nama, kode_grade from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama","kode_grade"],false,["NIK","Nama","Grade"],"and","Data NIK Pembuat",true);			
			this.cb_loker.setText(this.app._kodeLoker);
			this.cb_buat.setText(this.app._userLog);
			var data = this.dbLib.getDataProvider("select kode_spro,flag from gr_spro where kode_spro in ('UHAR','TRAN') and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "UHAR") this.akunUH = parseFloat(line.flag);
					if (line.kode_spro == "TRAN") this.akunTR = parseFloat(line.flag);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_adm_fSpj.extend(window.childForm);
window.app_hris_transaksi_adm_fSpj.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_spj_m","no_spj",this.app._lokasi+"-SPPD"+this.e_periode.getText().substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_spj_m(no_spj,kode_lokasi,periode,tanggal,sts_spj,kode_loker,keterangan,nik_buat,nik_app,progress,akun_uhar,akun_tran,transport,harian,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_spj.getText()+"','"+this.cb_loker.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','0','"+this.akunUH+"','"+this.akunTR+"',"+parseNilai(this.e_ut.getText())+","+parseNilai(this.e_uh.getText())+",getdate(),'"+this.app._userLog+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_spj_dt(no_spj,kode_lokasi,no_urut,kode_rute,asal,tujuan,jenis,nilai) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"',"+parseNilai(this.sg.cells(2,i))+")");
							}
						}
					}					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into gr_spj_dh(no_spj,kode_lokasi,no_urut,sts_spj,tgl_mulai,tgl_selesai,lama,tarif,nilai) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.cb_spj.getText()+"','"+this.sg2.getCellDateValue(0,i)+"','"+this.sg2.getCellDateValue(1,i)+"',"+parseNilai(this.sg2.cells(2,i))+","+parseNilai(this.sg2.cells(3,i))+","+parseNilai(this.sg2.cells(4,i))+")");
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sg2.clear(1);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				if (nilaiToFloat(this.e_ut.getText()) + nilaiToFloat(this.e_uh.getText() ) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang dari nol.");
					return false;						
				}
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
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doChange:function(sender){
		if (sender == this.cb_spj) {
			this.sg2.clear(1);
		}
		if (sender == this.cb_loker) {
			if (this.cb_loker.getText()!="") {
				//this.cb_buat.setText("","");
				this.cb_buat.setSQL("select nik, nama, kode_grade from gr_karyawan where kode_loker ='"+this.cb_loker.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama","kode_grade"],false,["NIK","Nama","Grade"],"and","Data NIK Pembuat",true);			
			}
		}
		if (sender == this.cb_buat) {
			this.sg.clear(1);
			this.sg2.clear(1);
			if (this.cb_buat.getText() != "" && this.cb_buat.dataFromList[2] !="") {
				var data = this.dbLib.getDataProvider("select nilai from gr_spj_harian where kode_grade = '"+this.cb_buat.dataFromList[2]+"' and sts_spj = '"+this.cb_spj.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.nilai_uh = parseFloat(line.nilai);
					}
				}
			}
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_spj_m","no_spj",this.app._lokasi+"-SPPD"+this.e_periode.getText().substr(2,4)+".","000"));
		this.cb_spj.setFocus();
	},
	doChangeCell: function(sender, col, row) {
		if (col == 0 && this.cb_buat.dataFromList[2] !="" ) {
			this.sg.setCell(2,row,floatToNilai(this.sg.dataFromList[2]));
		}
		this.sg.validasi();
	},
	doChangeCell2: function(sender, col, row) {
		if (col == 2) {
			this.sg2.setCell(3,row,floatToNilai(this.nilai_uh));
			this.sg2.setCell(4,row,floatToNilai(this.nilai_uh * nilaiToFloat(this.sg2.cells(2,row))));
		}
		this.sg2.validasi();
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.getCell(2,i) != ""){
					tot += nilaiToFloat(this.sg.getCell(2,i));			
				}
			}
			this.e_ut.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doNilaiChange2: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.getCell(4,i) != ""){
					tot += nilaiToFloat(this.sg2.getCell(4,i));			
				}
			}
			this.e_uh.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doEllipsClick: function(sender, col, row) {
		try{
			switch(col){
				case 0 :
							this.standarLib.showListDataForSG(this, "Daftar Rute",this.sg, this.sg.row, this.sg.col, 
														"select a.kode_rute, a.nama, pp+airtax+taxi+ka as tarif from gr_spj_rute a inner join gr_spj_transport b on a.kode_rute=b.kode_rute and a.kode_lokasi=b.kode_lokasi "+
														"where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_grade = '"+this.cb_buat.dataFromList[2]+"' ",
														"select count(a.kode_rute) from gr_spj_rute a inner join gr_spj_transport b on a.kode_rute=b.kode_rute and a.kode_lokasi=b.kode_lokasi "+
														"where a.kode_lokasi='"+this.app._lokasi+"' and b.kode_grade = '"+this.cb_buat.dataFromList[2]+"' ",
														 new Array("a.kode_rute","a.nama","tarif"),"and",new Array("Kode","Nama","Tarif"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
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
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});