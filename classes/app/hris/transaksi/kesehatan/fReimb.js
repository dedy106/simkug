window.app_hris_transaksi_kesehatan_fReimb = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_kesehatan_fReimb.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_kesehatan_fReimb";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Reimburse Biaya Kesehatan dan Bantuan: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Reimburse",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:100});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal Kuitansi", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,100,18],date:new Date().getDateStr()}); 
		this.cb_buat = new saiCBBL(this,{bound:[20,16,205,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:1, change:[this,"doChange"]});
		this.e_nilai = new saiLabelEdit(this,{bound:[520,16,200,20],caption:"Total Reimburse", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new panel(this,{bound:[20,23,700,303],caption:"Daftar Reimburse Kesehatan dan Bantuan"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,695,250],colCount:9,tag:0,
		            colTitle:["Grade","Jabatan","Loker","NIK","Nama","Kode Jenis","Keterangan","Saldo Plafon","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,150,80,30,30,30,30,30]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7],[8]],
					colHide: [[0,1,2,3,4],true],
					buttonStyle:[[5],[bsEllips]], 
					colFormat:[[7,8],[cfNilai,cfNilai]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					appendRow:[this,"doAppendRow"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,275,899,25],buttonStyle:2,grid:this.sg});

		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.cb_buat.setSQL("select a.nik,a.nama,a.kode_grade,b.kode_klpjab,a.kode_loker from gr_karyawan a inner join gr_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"' ",["nik","nama","kode_grade","kode_klpjab","kode_loker"],false,["NIK","Nama","Grade","Klp Jab","Loker"],"and","Data NIK Pembuat",true);			
			this.cb_buat.setText(this.app._userLog);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_kesehatan_fReimb.extend(window.childForm);
window.app_hris_transaksi_kesehatan_fReimb.implement({
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
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_kes_m","no_kes",this.app._lokasi+"-REIM"+this.e_periode.getText().substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_kes_m(no_kes,kode_lokasi,periode,tanggal,keterangan,nik_buat,tgl_kuitansi,tgl_input,nik_user,progress) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.dp_d2.getDateString()+"',getdate(),'"+this.app._userLog+"','0')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_kes_d(no_kes,kode_lokasi,nik,periode,kode_jenis,kode_loker,kode_grade,kode_klpjab,pasien,kode_akun,nilai,saldo) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(3,i)+"','"+this.e_periode.getText()+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','-','-','"+parseNilai(this.sg.cells(8,i))+"',"+parseNilai(this.sg.cells(7,i))+")");
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
			    for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						if (nilaiToFloat(this.sg.cells(7,i)) < nilaiToFloat(this.sg.cells(8,i))) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Nilai melebihi Saldo [Baris "+k+"]");
							return false;						
						}
						/*dibuka aja...
						 * for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(3,j) == this.sg.cells(3,i) && this.sg.cells(5,j) == this.sg.cells(5,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data reimburse untuk baris ["+k+"]");
								return false;
							}
						}*/
					}
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
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_kes_m","no_kes",this.app._lokasi+"-REIM"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
	},
	doChange:function(sender){
		this.sg.clear(1);
		if (sender == this.cb_buat){						
			for (var i=0; i < this.sg.getRowCount();i++){
				this.sg.cells(0,i,sender.dataFromList[2]);
				this.sg.cells(1,i,sender.dataFromList[3]);
				this.sg.cells(2,i,sender.dataFromList[4]);
				this.sg.cells(3,i,sender.dataFromList[0]);
				this.sg.cells(4,i,sender.dataFromList[1]);			
			}
		}
		
	},
	doAppendRow: function(sender,idx,values){
		this.sg.cells(0,idx,this.cb_buat.dataFromList[2]);
		this.sg.cells(1,idx,this.cb_buat.dataFromList[3]);
		this.sg.cells(2,idx,this.cb_buat.dataFromList[4]);
		this.sg.cells(3,idx,this.cb_buat.dataFromList[0]);
		this.sg.cells(4,idx,this.cb_buat.dataFromList[1]);
		this.sg.cells(5,idx,"");
		this.sg.cells(6,idx,"");
		this.sg.cells(7,idx,"0");		
		
		this.sg.setRowIndex(idx,5);
	},
	doEllipsClick: function(sender, col, row) {
		try{
			switch(col){
				case 3 :
						this.standarLib.showListDataForSG(this, "Daftar Karyawan",this.sg, this.sg.row, this.sg.col, 
														"select a.nik,a.nama,a.kode_grade,b.kode_klpjab,a.kode_loker from gr_karyawan a inner join gr_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"'",
														"select count(a.nik)                                         from gr_karyawan a inner join gr_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"'",
														 new Array("nik","nama","kode_grade","kode_klpjab","kode_loker"),"and",new Array("NIK","Nama","Grade","Klp Jabatan","Loker"),false);					
						break;					
				case 5 :
						this.standarLib.showListDataForSG(this, "Daftar Jenis Plafon",this.sg, this.sg.row, this.sg.col, 
														"select kode_jenis,nama from gr_kes_jenis where kode_lokasi='"+this.app._lokasi+"'",
														"select count(kode_jenis)  from gr_kes_jenis where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_jenis","nama"),"and",new Array("Kode","Nama"),false);					
						break;											
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	doChangeCell: function(sender, col, row) {
		if (col == 3) {
			if (this.sg.dataFromList[2] != "") {
				this.sg.cells(0,row,this.sg.dataFromList[2]);
				this.sg.cells(1,row,this.sg.dataFromList[3]);
				this.sg.cells(2,row,this.sg.dataFromList[4]);
				this.sg.cells(5,row,"");
				this.sg.cells(6,row,"");
				this.sg.cells(7,row,"0");
			}
		}
		if (col == 5) {				  
			var tahun=this.e_periode.getText().substr(0,4);
			if (this.sg.cells(5,row) != "" && this.sg.cells(1,row) != "" && this.sg.cells(0,row) != "") {
				var data = this.dbLib.getDataProvider(
					"select a.nik,isnull(c.nilai,0)-isnull(b.nilai,0) as saldo "+
					"from gr_karyawan a "+
					"left join (select nik,sum(case kode_jenis when '"+this.sg.cells(5,row)+"' then nilai else 0 end) as nilai "+
					"		   from gr_kes_d "+
					"		   where kode_lokasi='01' and substring(periode,1,4)='"+tahun+"' and nik='"+this.cb_buat.getText()+"' "+
					"		   group by nik "+
					"		   )b on b.nik=b.nik "+
					"left join (select '"+this.cb_buat.getText()+"' as nik,nilai "+
					"			from gr_kes_param "+
					"			where tahun='"+tahun+"' and kode_grade='"+this.sg.cells(0,row)+"' and kode_klpjab='"+this.sg.cells(1,row)+"' and kode_jenis='"+this.sg.cells(5,row)+"' "+
					"		   )c on a.nik=c.nik "+
					"where a.nik='"+this.cb_buat.getText()+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.sg.cells(7,row,floatToNilai(line.saldo));
					}
				}		
			}
		}
		if (col == 8) this.sg.validasi();
	},	
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.getCell(8,i) != ""){
					tot += nilaiToFloat(this.sg.getCell(8,i));			
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
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
