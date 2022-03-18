window.app_saku2_transaksi_siaga_fPjPtgFinalE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fPjPtgFinalE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fPjPtgFinalE";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penyelesaian Panjar Non KasBank: Edit", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,16,240,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});								
		this.cb_buat = new saiCBBL(this,{bound:[20,14,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_app = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});						
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_ptg = new saiCBBL(this,{bound:[20,13,240,20],caption:"Bukti Pertgg.", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});					
		this.cb_panjar = new saiCBBL(this,{bound:[20,14,240,20],caption:"No Panjar", readOnly:true});							
		this.e_debet = new saiLabelEdit(this,{bound:[790,14,210,20],caption:"Total Debet (IDR)", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		this.c_curr = new saiLabelEdit(this,{bound:[20,19,160,20],caption:"Mt Uang - Kurs", tag:0, readOnly:true, text:"IDR"});				
		this.e_kurs = new saiLabelEdit(this,{bound:[190,19,50,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"1",change:[this,"doChange"], tag:2});
		this.e_kredit = new saiLabelEdit(this,{bound:[790,19,210,20],caption:"Total Kredit (IDR)", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});								
		this.e_nilaiCurr = new saiLabelEdit(this,{bound:[20,20,220,20],caption:"Nilai Curr", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_sls = new saiLabelEdit(this,{bound:[790,20,210,20],caption:"Selisih (IDR)", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
				
		this.p1 = new portalui_panel(this,{bound:[20,12,980,300],caption:"Item Pertanggungan"});				
		this.sg3 = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:10,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Nilai IDR","Kode PP","Nama PP","Kode DRK","Nama DRK"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[150,80,150,80,100,100,200,50,150,80]],					
					nilaiChange:[this,"doNilaiChange"],readOnly:true,colFormat:[[4,5],[cfNilai,cfNilai]],autoAppend:false,defaultRow:1});					
		this.sgn3 = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg3});
		this.cb1 = new portalui_checkBox(this.sgn3,{bound:[920,5,100,25],caption:"Preview",selected:true});
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");			
			this.flagGarFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;								
				}
			}							
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fPjPtgFinalE.extend(window.childForm);
window.app_saku2_transaksi_siaga_fPjPtgFinalE.implement({
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
					sql.add("delete from gr_panjarselesai_m where no_selesai = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_panjarselesai_j where no_selesai = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update gr_panjarptg_m set progress='0', no_kas='-' where no_ptg='"+this.cb_ptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					
					sql.add("update gr_panjarptg_m set progress='1', no_kas='"+this.e_nb.getText()+"' where no_ptg='"+this.cb_ptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into gr_panjarselesai_m (no_selesai,no_panjar,no_ptg,tanggal,keterangan,nik_buat,nik_app,kode_lokasi,kode_pp,kode_curr,kurs,nilai_curr,nilai,posted,periode,nik_user,tgl_input) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_panjar.getText()+"','"+this.cb_ptg.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.e_nilaiCurr.getText())+","+parseNilai(this.e_debet.getText())+",'F','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");										
					if (this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							if (this.sg3.rowValid(i)){								
								sql.add("insert into gr_panjarselesai_j(no_selesai,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_ptg.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg3.cells(0,i)+"','"+this.sg3.cells(3,i)+"','"+this.sg3.cells(2,i)+"','"+this.c_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.sg3.cells(4,i))+","+parseNilai(this.sg3.cells(5,i))+",'"+this.sg3.cells(6,i)+"','"+this.sg3.cells(8,i)+"','"+this.app._lokasi+"','PJSELESAI','BBNPJ','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
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
					this.sg3.clear(3);					
					this.c_curr.setText("IDR");
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :																						
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg3.validasi();							
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai Kurs,Total Debet atau Kredit tidak boleh nol atau kurang.");
					return false;						
				}
				if (parseFloat(this.perLama) < parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode transaksi sebelumnya.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.cb1.setSelected(false);
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_panjarselesai_m where no_selesai = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_panjarselesai_j where no_selesai = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update gr_panjarptg_m set progress='0', no_kas='-' where no_ptg='"+this.cb_ptg.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12)this.e_periode.setText(y+""+m);			
		else this.e_periode.setText(this.app._periode);									
	},
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			this.e_nb.setSQL("select a.no_selesai, a.keterangan from gr_panjarselesai_m a inner join gr_panjarptg_m b on a.no_selesai=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
			                 "where b.progress ='1' and a.posted='F' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_selesai","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);							 		
		}									
		if (sender == this.e_nb && this.e_nb.getText()!="") {						
			var data = this.dbLib.getDataProvider("select a.nik_app,e.nama as nama_app,a.nik_buat,d.nama as nama_buat,a.periode,a.tanggal,a.keterangan,b.no_ptg,b.keterangan as ket_ptg,c.no_panjar,c.keterangan as ket_pj,a.kode_curr,a.kurs,c.nilai_curr as nilai_pj "+
			           "from gr_panjarselesai_m a  inner join gr_panjarptg_m b on a.no_ptg=b.no_ptg and a.kode_lokasi=b.kode_lokasi "+
					   "                           inner join gr_panjar_m c on a.no_panjar=c.no_panjar and a.kode_lokasi=c.kode_lokasi "+
					   "						   inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi "+	
					   "						   inner join karyawan e on a.nik_app=e.nik and a.kode_lokasi=e.kode_lokasi "+	
					   "where a.no_selesai='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
                    this.perLama = line.periode;
					this.dp_d1.setText(line.tanggal);
					this.e_ket.setText(line.keterangan);					
					this.cb_buat.setText(line.nik_buat,line.nama_buat);										
					this.cb_app.setText(line.nik_app,line.nama_app);										
					this.cb_ptg.setText(line.no_ptg,line.ket_ptg);					
					this.cb_panjar.setText(line.no_panjar,line.ket_pj);					
					this.c_curr.setText(line.kode_curr);
					this.e_kurs.setText(floatToNilai(line.kurs));
					this.e_nilaiCurr.setText(floatToNilai(line.nilai_pj));					
					if (this.c_curr.getText() == "IDR") this.e_kurs.setReadOnly(true); 					
					else this.e_kurs.setReadOnly(false); 
				} 
			}			
			var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.nilai_curr,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk  "+
						"from gr_panjarselesai_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"                          inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+								
						"                          left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
						"where a.no_selesai = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg3.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai_curr),floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk]);
				}
			} else this.sg3.clear(1);
			this.sg3.validasi();			
		}				
		if (sender == this.e_kurs) {
			this.sg3.validasi();
		}
	},		
	doNilaiChange: function(){
		try{
			var totD = totC = 0;			
			for (var i = 0; i < this.sg3.rows.getLength();i++){
				if (this.sg3.rowValid(i) && this.sg3.cells(4,i) != "" && this.e_kurs.getText() != ""){
					this.sg3.cells(5,i,floatToNilai(nilaiToFloat(this.e_kurs.getText()) * nilaiToFloat(this.sg3.cells(4,i))));					
					if (this.sg3.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg3.cells(5,i));
					if (this.sg3.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg3.cells(5,i));
				}
			}			
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
			var sls = totD - totC;
			this.e_sls.setText(floatToNilai(sls));
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
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
							this.clearLayar();							
						}else system.info(this,result,"");
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
			this.sg3.clear(1);			
			setTipeButton(tbUbahHapus);
			this.c_curr.setText("IDR");			
		} catch(e) {
			alert(e);
		}
	}
});