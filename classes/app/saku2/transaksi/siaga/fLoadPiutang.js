window.app_saku2_transaksi_siaga_fLoadPiutang = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fLoadPiutang.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fLoadPiutang";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Piutang: Load", 0);	
		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;portalui_saiMemo");
		uses("portalui_saiGrid",true);		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.cb_pp = new saiCBBL(this,{bound:[20,16,200,20],caption:"PP", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.cb_drk = new saiCBBL(this,{bound:[20,13,200,20],caption:"DRK", multiSelection:false, maxLength:10, tag:2});				
		this.cb_ppn = new saiCBBL(this,{bound:[20,14,200,20],caption:"Akun PPN", multiSelection:false, maxLength:10, tag:2});						
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});				
		this.cb_app = new saiCBBL(this,{bound:[20,15,200,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:2});				
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,16,220,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[245,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_ket = new saiLabelEdit(this,{bound:[20,18,450,20],caption:"Deskripsi", maxLength:150});		
		this.bUpload = new portalui_uploader(this,{bound:[920,18,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
						
		this.pc1 = new pageControl(this,{bound:[20,20,980,295], childPage:["Rekapitulasi Nilai","Detail Data Billing","Error Log"]});		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Total Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_ppn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Total PPN", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:0,
				colTitle:["Kode Cust","No Dokumen","Keterangan","Akun AR","Akun Pdpt","Kode Curr","Kurs","Nilai","Nilai PPN","Total"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,100,100,60,60,80,80,300,100,80]],
				colFormat:[[6,7,8,9],[cfNilai,cfNilai,cfNilai,cfNilai]],readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});
		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.e_memo = new saiMemo(this.pc1.childPage[2],{bound:[5,5,900,280],labelWidth:0,tag:9});
		this.e_memo.setReadOnly(true);
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try {			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_pp.setText(this.app._kodePP,this.app._namaPP);			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
									
			this.cb_ppn.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where b.kode_flag = '021' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_akun","a.nama"],false,["Kode","Nama"],"and","Data Akun PPN",true);						
			this.cb_pp.setSQL("select kode_pp, nama from pp where tipe='posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);			
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Mengetahui",true);			
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");												
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fLoadPiutang.extend(window.childForm);
window.app_saku2_transaksi_siaga_fLoadPiutang.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   		
			this.e_memo.setText("");
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);	

			var line;
			var nilai = ppn = total = 0;
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];												
				nilai += parseFloat(line.nilai);				
				ppn += parseFloat(line.ppn);				
				total += parseFloat(line.total);									
			}			
			this.e_nilai.setText(floatToNilai(nilai));			
			this.e_ppn.setText(floatToNilai(ppn));			
			this.e_total.setText(floatToNilai(total));				
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];			
			this.sg1.appendData([line.kode_cust,line.no_dok,line.keterangan,line.akun_ar,line.akun_pdpt,line.kode_curr,floatToNilai(line.kurs),floatToNilai(line.nilai),floatToNilai(line.ppn),floatToNilai(line.total)]);
		}
		this.sg1.setNoUrut(start);
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_piutangload_m(no_load,tanggal,keterangan,kode_lokasi,kode_pp,periode,nik_user,tgl_input,kode_drk,akun_ppn,nik_buat,nik_app) values "+
						    "('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.cb_drk.getText()+"','"+this.cb_ppn.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"')");					
					
					var idx2="";
					var AddFormat = "/"+this.Aperiode+"/"+this.e_periode.getText().substr(2,2)+"/";
					var data = this.dbLib.getDataProvider("select isnull(max(substring(no_piutang,4,20)),0) as no_piutang from gr_piutang_m where no_piutang like '_______"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							if (line.no_piutang == "0") var idx = 0;
							else var idx = parseFloat(line.no_piutang.substr(0,4));
						} 
					}					
					var line;					
					for (var i=0; i < this.dataUpload.rows.length;i++){
						line = this.dataUpload.rows[i];						
						idx++;
						idx2 = idx.toString();
						
						if (idx2.length == 1) var nu = "000"+idx2;
						if (idx2.length == 2) var nu = "00"+idx2;
						if (idx2.length == 3) var nu = "0"+idx2;
						if (idx2.length == 4) var nu = idx2;
						var noAR = "PIU"+nu+AddFormat+this.cb_pp.getText();
						
						sql.add("insert into gr_piutangload_d(no_load,kode_lokasi,no_piutang) values "+
						        "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+noAR+"')");
								
						var nilaiPIU = Math.round(parseFloat(line.total) * parseFloat(line.kurs));
						var nilaiPDPT = Math.round(parseFloat(line.nilai) * parseFloat(line.kurs));
						var nilaiPPN = Math.round(parseFloat(line.ppn) * parseFloat(line.kurs));
						
						if (nilaiPIU != nilaiPDPT+nilaiPPN) {
							system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
							return false;
						}						
						sql.add("insert into gr_piutang_m(no_piutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_cust,kode_curr,kurs,nik_buat,nik_app,kode_pp,nilai_curr,nilai,periode,nik_user,tgl_input,akun_piutang,kode_drk,posted,nilai_ppn) values  "+
							"('"+noAR+"','"+this.app._lokasi+"','"+line.no_dok+"','"+this.dp_d1.getDateString()+"','"+line.keterangan+"','"+line.kode_cust+"','"+line.kode_curr+"',"+parseNilai(line.kurs)+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.cb_pp.getText()+"',"+parseNilai(line.total)+","+nilaiPIU+",'"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+line.akun_ar+"','"+this.cb_drk.getText()+"','F',"+parseNilai(line.ppn)+")");						
						sql.add("insert into gr_piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+noAR+"','"+line.no_dok+"','"+this.dp_d1.getDateString()+"',0,'"+line.akun_ar+"','"+line.keterangan+"','D','"+line.kode_curr+"',"+parseNilai(line.kurs)+","+parseNilai(line.total)+","+nilaiPIU+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PIUTANG','PIU','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");																																
						sql.add("insert into gr_piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+noAR+"','"+line.no_dok+"','"+this.dp_d1.getDateString()+"',1,'"+line.akun_pdpt+"','"+line.keterangan+"','C','"+line.kode_curr+"',"+parseNilai(line.kurs)+","+parseNilai(line.nilai)+","+nilaiPDPT+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','PIUTANG','PDPT','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");																																
						sql.add("insert into gr_piutang_j(no_piutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input) values "+
							"('"+noAR+"','"+line.no_dok+"','"+this.dp_d1.getDateString()+"',2,'"+this.cb_ppn.getText()+"','"+line.keterangan+"','C','"+line.kode_curr+"',"+parseNilai(line.kurs)+","+parseNilai(line.ppn)+","+nilaiPPN+",'"+this.cb_pp.getText()+"','-','"+this.app._lokasi+"','PIUTANG','PPN','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
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
					this.sg1.clear(1); 										
					setTipeButton(tbSimpan);
					this.doClick();
				break;
			case "simpan" :													
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg1.validasi();				
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
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
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);
			if (m=="01") this.Aperiode = "A";
			if (m=="02") this.Aperiode = "B";
			if (m=="03") this.Aperiode = "C";
			if (m=="04") this.Aperiode = "D";
			if (m=="05") this.Aperiode = "E";
			if (m=="06") this.Aperiode = "F";
			if (m=="07") this.Aperiode = "G";
			if (m=="08") this.Aperiode = "H";
			if (m=="09") this.Aperiode = "I";
			if (m=="10") this.Aperiode = "J";
			if (m=="11") this.Aperiode = "K";
			if (m=="12") this.Aperiode = "L";			
		}
		else {
			this.e_periode.setText(this.app._periode);		
			if (m=="13") this.Aperiode = "M";			
			if (m=="14") this.Aperiode = "N";			
			if (m=="15") this.Aperiode = "O";			
			if (m=="16") this.Aperiode = "P";						
		}	
		this.cb_drk.setSQL("select kode_drk, nama from drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);			
		this.doClick();
	},	
	doChange:function(sender){		
		if (sender == this.cb_pp && this.cb_pp.getText()!="")
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);			
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "") {				
			var AddFormat = "/"+this.Aperiode+"/"+this.e_periode.getText().substr(2,2)+"/";
			var data = this.dbLib.getDataProvider("select isnull(max(substring(no_load,4,20)),0) as no_load from gr_piutangload_m where no_load like '______"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					if (line.no_load == "0") this.e_nb.setText("LAR001"+AddFormat+this.cb_pp.getText());
					else {
						var idx = parseFloat(line.no_load.substr(0,3)) + 1;
						idx = idx.toString();
						if (idx.length == 1) var nu = "00"+idx;
						if (idx.length == 2) var nu = "0"+idx;
						if (idx.length == 3) var nu = idx;
						this.e_nb.setText("LAR"+nu+AddFormat+this.cb_pp.getText());
					}
				} 
			}
			this.e_ket.setFocus();
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses tereksekusi");
						this.app._mainForm.bClear.click();              
					}else {
						system.info(this, result,"");											
						setTipeButton(tbSimpan);
					}
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}	
});