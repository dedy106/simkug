window.app_saku2_transaksi_yks_hutpiu_fMutasiTerima = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_yks_hutpiu_fMutasiTerima.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_yks_hutpiu_fMutasiTerima";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Terima Mutasi Piutang: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti KB",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});						
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:1});
		this.cb_app = new saiCBBL(this,{bound:[20,18,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.e_debet = new saiLabelEdit(this,{bound:[800,18,202,20],caption:"Total Debet", readOnly:true,tipeText:ttNilai, text:"0"});		
		this.cb_kirim = new saiCBBL(this,{bound:[20,17,220,20],caption:"No TAK Kirim", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});
		this.e_kredit = new saiLabelEdit(this,{bound:[800,17,202,20],caption:"Total Kredit", readOnly:true,tipeText:ttNilai, text:"0"});		
		this.bJurnal = new button(this,{bound:[650,17,80,18],caption:"Jurnal",click:[this,"doJurnal"]});			
		this.i_appAll = new portalui_imageButton(this,{bound:[740,17,20,20],hint:"Approve All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
			
		this.pc1 = new pageControl(this,{bound:[20,12,980,290], childPage:["Daftar Approve Piutang","Jurnal"]});						
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:6,tag:0,		            
					colTitle:["Status","No Approve","Periode","Keterangan","Akun Mutasi","Nilai"],
					colWidth:[[5,4,3,2,1,0],[100,70,250,80,150,80]],
					columnReadOnly:[true,[0,1,2,3,4,5],[]],
					colFormat:[[5],[cfNilai]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
					change:[this,"doChangeCell"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[920,5,100,25],caption:"Preview",selected:true});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Jenis","Kode DRK"],
					colWidth:[[6,5,4,3,2,1,0],[80,80,100,240,50,200,100]],
					columnReadOnly:[true,[0,1,2,4,5,6],[3]],
					colFormat:[[4],[cfNilai]],
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg2});		
		
		this.rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
					
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			this.cb_kirim.setSQL("select distinct a.no_kirim,a.keterangan from takkirim_m a "+
			                     "    inner join yk_takapp_d b on a.no_kirim=b.no_kirim and b.kode_loktuj='"+this.app._lokasi+"' and b.progress='0' "+
								 "    ",["a.no_kirim","a.keterangan"],false,["No Kirim","Keterangan"],"and","Daftar Kirim",true);
			
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
		
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='KBAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
			
			var data = this.dbLib.getDataProvider("select flag from spro where kode_spro='PPBPCC' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.kodepp = line.flag;
			} else this.kodepp = '-';
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_yks_hutpiu_fMutasiTerima.extend(window.childForm);
window.app_saku2_transaksi_yks_hutpiu_fMutasiTerima.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"takterima_m","no_terima",this.app._lokasi+"-TTPIU"+this.e_periode.getText().substr(2,4)+".","000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into takterima_m(no_terima,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_del,no_link,tgl_input,nik_user,kode_lokkirim,no_kirim) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','-','TTAPP','TAKPIUAPP','IDR',1,"+parseNilai(this.e_debet.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','F','-','-',getdate(),'"+this.app._userLog+"','"+this.cb_kirim.getText().substr(0,2)+"','"+this.cb_kirim.getText()+"')");					
					
					if (this.sg2.getRowValidCount() > 0){
						var j=0;
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
							    j = i+1;
								sql.add("insert into takterima_j(no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
										"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',"+j+",'"+this.sg2.cells(0,i)+"','"+this.sg2.cells(3,i)+"','"+this.sg2.cells(2,i)+"',"+parseNilai(this.sg2.cells(4,i))+",'"+this.kodepp+"','"+this.sg2.cells(6,i)+"','"+this.app._lokasi+"','TTAPP','"+this.sg2.cells(5,i)+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
							}
						}
					}
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP"){								
								sql.add("update yk_takapp_d set progress='1',no_terima='"+this.e_nb.getText()+"' where no_kirim='"+this.cb_kirim.getText()+"' and no_app='"+this.sg.cells(1,i)+"' and kode_loktuj='"+this.app._lokasi+"'");
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
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (nilaiToFloat(this.e_debet.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai TAK tidak boleh nol atau kurang.");
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
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"takterima_m","no_terima",this.app._lokasi+"-TTPIU"+this.e_periode.getText().substr(2,4)+".","000"));
		}
		if (sender == this.i_appAll) {
			if (this.sg.getRowValidCount() > 0){
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						this.sg.cells(0,i,"APP");
					}
				}
			}
			this.sg.validasi();
		}
	},
	doChange:function(sender){
		if (sender == this.cb_kirim && this.cb_kirim.getText()!="") {
			var strSQL = "select no_app,periode,keterangan,akun_tak,nilai from yk_takapp_d where kode_loktuj='"+this.app._lokasi+"' and progress='0' and no_kirim='"+this.cb_kirim.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["INPROG",line.no_app,line.periode,line.keterangan,line.akun_tak,floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
	},
	doJurnal:function(sender){				
		this.sg2.clear(0); 		
		var nobukti = "";
		for (var i=0;i < this.sg.getRowCount();i++){
			if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP") {
				nobukti += ",'"+this.sg.cells(1,i)+"'";
			}
		}		
		nobukti = nobukti.substr(1);		
		var ket = this.e_ket.getText();
		if (ket == "") ket = "-";
		var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,'"+ket+"' as ket,a.nilai,a.jenis "+
					"from "+
					"( "+					
							"select 'SLSPIUBP' as jenis,a.kode_lokasi,case b.jenis "+
							"		 	when 'PEGAWAI' then c.akun_bp "+
							"	    end as kode_akun,  "+
							"	    'C' as dc, sum(a.nilai) as nilai  "+
							"from yk_bill_d a "+
							"         inner join cust b on a.loker_bast = b.kode_cust  "+
							"         inner join yk_produk c on a.kode_produk = c.kode_produk  "+
							"where a.flag_aktif ='1' and b.jenis <> 'PENSIUN' and a.no_selesai in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' "+							
		                    "group by a.kode_lokasi,case b.jenis "+
							"		 	when 'PEGAWAI' then c.akun_bp "+							
							"	    end "+
							"union "+
							
							//KUNJ
							"select 'SLSPIUKUNJ' as jenis,a.kode_lokasi,c.akun_pku as kode_akun,  "+
							"	   'C' as dc, sum(a.umum) as nilai "+
							"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
							"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
							"where a.flag_aktif ='1' and b.jenis <> 'PENSIUN' and a.umum<> 0 and a.no_selesai in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' "+							
							"group by  a.kode_lokasi,c.akun_pku "+
							"union "+
							"select 'SLSPIUKUNJ' as jenis,a.kode_lokasi,c.akun_pkg as kode_akun,  "+
							"	   'C' as dc, sum(a.gigi) as nilai "+
							"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
							"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
							"where a.flag_aktif ='1' and b.jenis <> 'PENSIUN' and a.gigi<> 0 and a.no_selesai in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' "+							
							"group by  a.kode_lokasi,c.akun_pkg "+
							"union "+
							"select 'SLSPIUKUNJ' as jenis,a.kode_lokasi,c.akun_pkb as kode_akun,  "+
							"	   'C' as dc, sum(a.kbia) as nilai "+
							"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
							"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
							"where a.flag_aktif ='1' and b.jenis <> 'PENSIUN' and a.kbia<> 0 and a.no_selesai in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by  a.kode_lokasi,c.akun_pkb "+
							"union "+
							"select 'SLSPIUKUNJ' as jenis,a.kode_lokasi,c.akun_pmk as kode_akun,  "+
							"	   'C' as dc, sum(a.matkes) as nilai "+
							"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
							"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
							"where a.flag_aktif ='1' and b.jenis <> 'PENSIUN' and a.matkes<> 0 and a.no_selesai in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' "+							
							"group by  a.kode_lokasi,c.akun_pmk "+
							"union "+
							"select 'SLSPIUCS' as jenis,a.kode_lokasi,c.akun_piucs as kode_akun,  "+
							"	   'D' as dc, sum(a.cs) as nilai "+
							"from yk_billkunj_d a inner join cust b on a.loker_bast=b.kode_cust "+
							"			 inner join yk_kunj c on a.kode_produk=c.kode_produk "+
							"where a.flag_aktif ='1' and b.jenis <> 'PENSIUN' and a.cs<> 0 and a.no_selesai in ("+nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' "+							
							"group by  a.kode_lokasi,c.akun_piucs "+							
							
							"union "+
							"select 'SLSTAKPIU' as jenis,kode_loktuj as kode_lokasi,akun_tak as kode_akun,"+
							"     'D' as dc, sum(nilai) as nilai "+
							"from yk_takapp_d where kode_loktuj='"+this.app._lokasi+"' and progress='0' and no_kirim='"+this.cb_kirim.getText()+"' and no_app in ("+nobukti+") "+
							"group by kode_loktuj,akun_tak "+							
					") a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					"order by a.dc desc,a.kode_akun",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc.toUpperCase(),line.ket.toUpperCase(),floatToNilai(line.nilai),line.jenis.toUpperCase(),"900000001"]);
			}
		}
		
		
		this.sg2.validasi();
		this.pc1.setActivePage(this.pc1.childPage[1]);				
	},
	doChangeCell: function(sender, col, row){
		if ((col == 0) && (this.sg.cells(0,row) != "")) this.sg2.clear(1);		
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.cells(4,i) != ""){
					if (this.sg2.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg2.cells(4,i));
					if (this.sg2.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg2.cells(4,i));
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
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
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
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