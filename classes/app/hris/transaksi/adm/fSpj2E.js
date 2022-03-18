window.app_hris_transaksi_adm_fSpj2E = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_adm_fSpj2E.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_adm_fSpj2E";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Pengajuan SPPD: Edit", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No SPPD", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"Keterangan", maxLength:100});		
		this.cb_loker = new saiCBBL(this,{bound:[20,19,200,20],caption:"Loker", readOnly:true}); 
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat",  readOnly:true});
		this.e_ut = new saiLabelEdit(this,{bound:[720,16,200,20],caption:"Nilai Transport", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:1});
		this.e_uh = new saiLabelEdit(this,{bound:[720,17,200,20],caption:"Nilai Harian", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,253], childPage:["Daftar Biaya Transportasi","Daftar Uang Harian","Daftar Tanggal"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,		            
					colTitle:["Kode Rute","Nama","Tempat Asal","Tempat Tujuan","Jenis Angkutan","Tarif"],
					colWidth:[[5,4,3,2,1,0],[80,180,180,180,150,70]],
					columnReadOnly:[true,[0,1,],[2,3,4,5]],
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[5],[cfNilai]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
		            colTitle:["Kd Jenis","Jenis SPPD","Tanggal Berangkat","Tanggal Tiba","Lama Hari","Tarif","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[180,100,120,120,120,120,80]],
					columnReadOnly:[true,[0,1,4,5,6],[2,3]],
					colFormat:[[2,3,4,5,6],[cfDate,cfDate,cfNilai,cfNilai,cfNilai]],
					buttonStyle:[[0,2,3],[bsEllips,bsDate,bsDate]], 					
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});
		
		this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:1,tag:9,
		            colTitle:["Tanggal"],
					colWidth:[[0],[100]],						
					autoAppend:true,defaultRow:1});		
		
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.nilai_uh = 0;			
			this.cb_app.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			this.e_nb.setSQL("select no_spj, keterangan from gr_spj_m where progress = '0' and kode_lokasi='"+this.app._lokasi+"'",["no_spj","keterangan"],false,["No SPPD","Keterangan"],"and","Data SPPD",true);			
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
window.app_hris_transaksi_adm_fSpj2E.extend(window.childForm);
window.app_hris_transaksi_adm_fSpj2E.implement({
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
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_spj_m where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_spj_dt where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_spj_dh where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_absen_harian_d where no_load='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul = 'SPJ'");
										
					var tanggal = "";
					var jumlah = k = 0;
					this.sg3.clear(1);
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)){
							jumlah = nilaiToFloat(this.sg2.cells(4,i));							
							for (var j=0;j < jumlah;j++){			
								var data = this.dbLib.getDataProvider("select dateadd(day,"+j+",'"+this.sg2.getCellDateValue(2,i)+"') as tanggal",true);
								if (typeof data == "object" && data.rs.rows[0] != undefined){
									var line = data.rs.rows[0];											
									tanggal = line.tanggal.substr(0,4)+'-'+line.tanggal.substr(5,2)+'-'+line.tanggal.substr(8,2);
									this.sg3.cells(0,k,tanggal);
									this.sg3.appendRow(1);					
									k++;
								}
							}					
						}
					}
					
					sql.add("insert into gr_spj_m(no_spj,kode_lokasi,periode,tanggal,sts_spj,kode_loker,keterangan,nik_buat,nik_app,progress,akun_uhar,akun_tran,transport,harian,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','"+this.cb_loker.getText()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','0','"+this.akunUH+"','"+this.akunTR+"',"+parseNilai(this.e_ut.getText())+","+parseNilai(this.e_uh.getText())+",getdate(),'"+this.app._userLog+"')");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into gr_spj_dt(no_spj,kode_lokasi,no_urut,kode_trans,asal,tujuan,jenis,nilai) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(4,i)+"',"+parseNilai(this.sg.cells(5,i))+")");
							}
						}
					}					
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into gr_spj_dh(no_spj,kode_lokasi,no_urut,sts_spj,tgl_mulai,tgl_selesai,lama,tarif,nilai) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(0,i)+"','"+this.sg2.getCellDateValue(2,i)+"','"+this.sg2.getCellDateValue(3,i)+"',"+parseNilai(this.sg2.cells(4,i))+","+parseNilai(this.sg2.cells(5,i))+","+parseNilai(this.sg2.cells(6,i))+")");
							}
						}
					}					
					for (var i=0;i < this.sg3.getRowCount();i++){
						if (this.sg3.rowValid(i)){
							sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) values "+
									"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_buat.getText()+"','"+this.sg3.cells(0,i)+"','"+this.sg3.cells(0,i)+" 08:00:00','I','SPJ', '-')");
							sql.add("insert into gr_absen_harian_d(no_load,kode_lokasi,nik,tanggal,jam,jenis,modul,no_bukti) values "+
									"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_buat.getText()+"','"+this.sg3.cells(0,i)+"','"+this.sg3.cells(0,i)+" 17:00:00','O','SPJ', '-')");							
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
					this.sg.clear(1); this.sg2.clear(1); this.sg3.clear(1);
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :	
				if (nilaiToFloat(this.e_ut.getText()) + nilaiToFloat(this.e_uh.getText() ) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai tidak boleh nol atau kurang dari nol.");
					return false;						
				}
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_spj_m where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_spj_dt where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_spj_dh where no_spj='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_absen_harian_d where no_load='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul = 'SPJ'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);		
	},
	doChange:function(sender){
		if (sender == this.e_nb && this.e_nb.getText()!="") {		
			this.e_ket.setFocus();
			var data = this.dbLib.getDataProvider(
					   "select a.tanggal,a.keterangan,a.kode_loker,a.nik_buat,a.nik_app,b.nama as nama_loker,c.nama as nama_buat,d.nama as nama_app "+
					   "from gr_spj_m a inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi "+
					   "			    inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
					   "			    inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi "+					   					   
					   "where a.no_spj='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){										
					this.dp_d1.setText(line.tanggal);
					this.e_ket.setText(line.keterangan);					
					this.cb_loker.setText(line.kode_loker,line.nama_loker);
					this.cb_buat.setText(line.nik_buat,line.nama_buat);
					
					var data2 = this.dbLib.getDataProvider("select kode_grade from gr_karyawan where nik='"+this.cb_buat.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
						var line2 = data2.rs.rows[0];							
						this.kodegrade = line2.kode_grade;
					} else this.kodegrade = "";
										
					this.cb_app.setText(line.nik_app,line.nama_app);
				} 
			}
			
			var data = this.dbLib.getDataProvider("select a.kode_trans,a.asal+'-'+a.tujuan+'-'+a.jenis as nama,a.nilai,a.asal,a.tujuan,a.jenis "+
			           "from gr_spj_dt a "+
					   "where a.no_spj='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_trans,line.nama,line.asal,line.tujuan,line.jenis,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);
			var data = this.dbLib.getDataProvider(
					   "select a.sts_spj,b.nama as nama_spj,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.lama,a.tarif,a.nilai "+
			           "from gr_spj_dh a inner join gr_status_spj b on a.sts_spj=b.sts_spj and a.kode_lokasi=b.kode_lokasi "+
					   "where a.no_spj='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.sts_spj,line.nama_spj,line.tgl_mulai,line.tgl_selesai,floatToNilai(line.lama),floatToNilai(line.tarif),floatToNilai(line.nilai)]);
				}
			} else this.sg2.clear(1);				
			var data = this.dbLib.getDataProvider(
					   "select convert(varchar,tanggal,103) as tanggal from gr_absen_harian_d  "+
					   "where no_load='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and jenis ='I' and modul = 'SPJ'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg3.appendData([line.tanggal]);
				}
			} else this.sg3.clear(1);						
		}	
	},
	doChangeCell: function(sender, col, row) {
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.getCell(5,i) != ""){
					tot += nilaiToFloat(this.sg.getCell(5,i));			
				}
			}
			this.e_ut.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.getCell(5,i) != ""){
					tot += nilaiToFloat(this.sg.getCell(5,i));			
				}
			}
			this.e_ut.setText(floatToNilai(tot));
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
														"select kode_trans, asal+'-'+tujuan+'-'+jenis as keterangan from gr_spj_trans where kode_lokasi = '"+this.app._lokasi+"'",									
														"select count(kode_trans) from gr_spj_trans where kode_lokasi = '"+this.app._lokasi+"'",									
														 new Array("kode_trans","keterangan"),"and",new Array("Kode","Keterangan"),false);					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},		
	doEllipsClick2: function(sender, col, row) {
		try{
			switch(col){
				case 0 :
							this.standarLib.showListDataForSG(this, "Daftar Jenis SPPD",this.sg2, this.sg2.row, this.sg2.col, 
														"select sts_spj, nama  from gr_status_spj where kode_lokasi='"+this.app._lokasi+"'",
														"select count(sts_spj) from gr_status_spj where kode_lokasi='"+this.app._lokasi+"'",									
														 new Array("sts_spj","nama"),"and",new Array("Kode","Jenis"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},
	doChangeCell2: function(sender, col, row) {
		if (col == 2 || col == 3 || col == 0) {
			if (col == 0) {
				var data = this.dbLib.getDataProvider("select nilai from gr_spj_harian where kode_grade = '"+this.kodegrade+"' and sts_spj = '"+this.sg2.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.nilai_uh = parseFloat(line.nilai);
					}
				}
			}
			if (this.sg2.cells(2,row)=="" || this.sg2.cells(3,row)=="") this.sg2.cells(4,row,"0");
			else {
				var data = this.dbLib.getDataProvider("select datediff(day,'"+this.sg2.getCellDateValue(2,row)+"','"+this.sg2.getCellDateValue(3,row)+"')+1 as jumlah",true);			
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];
					if (parseFloat(line.jumlah) > 0) this.sg2.cells(4,row,floatToNilai(line.jumlah));
					else this.sg2.cells(4,row,"0");
				}		
			}
		}		
		if (col == 4) {
			this.sg2.setCell(5,row,floatToNilai(this.nilai_uh));
			this.sg2.setCell(6,row,floatToNilai(this.nilai_uh * nilaiToFloat(this.sg2.cells(4,row))));
		}
		this.sg2.validasi();
	},
	doNilaiChange2: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.getCell(6,i) != ""){
					tot += nilaiToFloat(this.sg2.getCell(6,i));			
				}
			}
			this.e_uh.setText(floatToNilai(tot));
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