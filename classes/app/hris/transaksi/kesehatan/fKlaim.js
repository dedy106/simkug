window.app_hris_transaksi_kesehatan_fKlaim = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_kesehatan_fKlaim.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_kesehatan_fKlaim";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Klaim Asuransi Kesehatan: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Klaim",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,350,20],caption:"Keterangan", maxLength:100});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal Kuitansi", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,100,18],date:new Date().getDateStr()}); 
		this.cb_asur = new saiCBBL(this,{bound:[20,13,205,20],caption:"Asuransi", multiSelection:false, maxLength:10, tag:1});
		this.cb_buat = new saiCBBL(this,{bound:[20,16,205,20],caption:"Karyawan", multiSelection:false, maxLength:10, tag:1});
		this.e_nilai = new saiLabelEdit(this,{bound:[520,16,200,20],caption:"Total Klaim", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new panel(this,{bound:[20,23,700,303],caption:"Item Klaim Asuransi Kesehatan"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,695,250],colCount:6,tag:0,
		            colTitle:["NIK","No Urut","Nama Pasien","Status","Jenis Perawatan","Nilai"],
					colWidth:[[5,4,3,2,1,0],[90,100,150,210,40,70]],
					colFormat:[[5],[cfNilai]],
					columnReadOnly:[true,[0,1,2,3],[4,5]],
					buttonStyle:[[0,4],[bsEllips,bsAuto]],
					defaultRow:1,
					picklist:[[4],[new portalui_arrayMap({items:["Rawat Jalan","Rawat Inap"]})]],
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					appendRow:[this,"doAppendRow"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,275,699,25],buttonStyle:2,grid:this.sg});

		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan Tertanggung",true);			
			this.cb_asur.setSQL("select kode_asur, nama from gr_asur where kode_lokasi='"+this.app._lokasi+"'",["kode_asur","nama"],false,["Kode","Nama"],"and","Data Asuransi",true);			
			this.cb_buat.setText(this.app._userLog);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_kesehatan_fKlaim.extend(window.childForm);
window.app_hris_transaksi_kesehatan_fKlaim.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_klaim_m","no_klaim",this.app._lokasi+"-KLM"+this.e_periode.getText().substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_klaim_m(no_klaim,kode_lokasi,periode,tanggal,keterangan,tgl_kuitansi,nilai,tgl_input,nik_user,nik_buat,progress,kode_asur) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+"',"+parseNilai(this.e_nilai.getText())+",getdate(),'"+this.app._userLog+"','"+this.cb_buat.getText()+"','0','"+this.cb_asur.getText()+"')");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_klaim_d(no_klaim,kode_lokasi,nik,no_urut,keterangan,nilai) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+this.sg.cells(1,i)+",'"+this.sg.cells(4,i)+"',"+parseNilai(this.sg.cells(5,i))+")");
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
					this.sg.clear(1);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
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
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_klaim_m","no_klaim",this.app._lokasi+"-KLM"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
	},
	doChangeCell: function(sender, col, row) {
		if (col == 0) {
			if (this.sg.dataFromList[0] != "") {
				this.sg.cells(0,row,this.sg.dataFromList[0]);
				this.sg.cells(1,row,this.sg.dataFromList[1]);
				this.sg.cells(2,row,this.sg.dataFromList[2]);
				this.sg.cells(3,row,this.sg.dataFromList[3]);
				this.sg.cells(4,row,"");
				this.sg.cells(5,row,"0");
			}
		}
		if (col == 4) this.sg.validasi();
	},	
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.getCell(5,i) != ""){
					tot += nilaiToFloat(this.sg.getCell(5,i));			
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doEllipsClick: function(sender, col, row) {
		try{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Pasien",this.sg, this.sg.row, this.sg.col, 
														"select a.nik,a.no_urut,a.nama,b.nama as status_kel "+
														"from gr_keluarga a "+
														"inner join gr_status_kel b on a.sts_kel=b.sts_kel and a.kode_lokasi=b.kode_lokasi "+
														"where a.nik='"+this.cb_buat.getText()+"' and a.flag_tanggung='Y' ",
														"select count(a.nik) "+
														"from gr_keluarga a "+
														"inner join gr_status_kel b on a.sts_kel=b.sts_kel and a.kode_lokasi=b.kode_lokasi "+
														"where a.nik='"+this.cb_buat.getText()+"' and a.flag_tanggung='Y' ",
														 new Array("a.nik","a.no_urut","a.nama","a.status_kel"),"and",new Array("NIK","No Urut","Nama","Status"),false);					
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
