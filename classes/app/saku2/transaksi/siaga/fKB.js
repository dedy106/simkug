window.app_saku2_transaksi_siaga_fKB = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_siaga_fKB.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_siaga_fKB";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank : Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti KB",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_buat = new saiCBBL(this,{bound:[20,16,220,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});		
		this.c_modul = new saiCB(this,{bound:[20,22,202,20],caption:"Modul",items:["SPB"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_bukti = new saiCBBL(this,{bound:[20,17,220,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		this.e_bank = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Acc. Bank", readOnly:true});				
		this.e_akun = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"Kode Akun", readOnly:true});				
		this.e_via = new saiLabelEdit(this,{bound:[20,16,200,20],caption:"Jenis", readOnly:true});				
		this.e_bg = new saiLabelEdit(this,{bound:[270,16,200,20],caption:"No BG", readOnly:true});						
		this.e_debet = new saiLabelEdit(this,{bound:[720,16,200,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_curr = new saiLabelEdit(this,{bound:[20,14,145,20],caption:"Curr - Kurs", readOnly:true,change:[this,"doChange"]});				
		this.e_kurs = new saiLabelEdit(this,{bound:[170,14,50,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, readOnly:true, text:"0",change:[this,"doChange"]});		
		this.e_nilai = new saiLabelEdit(this,{bound:[270,14,200,20],caption:"Nilai", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_kredit = new saiLabelEdit(this,{bound:[720,14,200,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.bJurnal = new portalui_button(this,{bound:[620,14,80,18],caption:"Jurnal",click:[this,"doJurnal"]});						
		
		this.p1 = new panel(this,{bound:[20,23,900,270],caption:"Data Item Jurnal"});		
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-45],colCount:10,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Keterangan","DC","Nilai","Jenis"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[60,100,50,200,150,80,150,80,150,80]],
					nilaiChange:[this,"doNilaiChange"],
					readOnly:true,colFormat:[[8],[cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});				
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[840,5,100,25],caption:"Preview",selected:true});
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		this.dataAkun = this.app._masakun;		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			uses("server_report_report;portalui_reportViewer");
			this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
			this.viewer.hide();
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
			this.report = new server_report_report();
			this.report.addListener(this);

			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			
			var data = this.dbLib.getDataProvider("select a.kode_spro,a.flag,b.nama from spro a inner join masakun b on a.flag=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_spro in ('LBKURS','RGKURS') and a.kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "LBKURS") {this.lbKurs = line.flag; this.lbNama = line.nama;}
					if (line.kode_spro == "RGKURS") {this.rgKurs = line.flag; this.rgNama = line.nama;}
				}
			}
			this.c_modul.setText("");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_siaga_fKB.extend(window.childForm);
window.app_saku2_transaksi_siaga_fKB.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BK"+this.e_periode.getText().substr(2,4)+".","0000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into kas_m(no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_bukti.getText()+"','"+this.e_bg.getText()+"','"+this.kodeakun+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KB','BK','"+this.e_periode.getText()+"','"+this.e_curr.getText()+"',"+parseNilai(this.e_kurs.getText())+","+parseNilai(this.e_nilai.getText())+",'"+this.cb_buat.getText()+"','"+this.cb_buat.getText()+"',getdate(),'"+this.app._userLog+"','F','-','-','"+this.cb_bukti.getText()+"','"+this.kodebank+"')");
					
					sql.add("insert into gr_kas_d(no_kas,kode_lokasi,no_bukti,modul) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_bukti.getText()+"','"+this.c_modul.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){						
						var kurs=nilaicurr = 0;
						var bank=curr="";
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){	
								if (this.c_modul.getText() == "SPB") sql.add("update gr_spb_m set no_kas='"+this.e_nb.getText()+"' where no_spb='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
								if (this.sg.cells(9,i)=="KB") {
									nilaicurr = nilaiToFloat(this.e_nilai.getText());
									bank = this.kodebank;
									curr = this.e_curr.getText();
									kurs = parseNilai(this.e_kurs.getText());
								}
								else {
									nilaicurr = nilaiToFloat(this.sg.cells(8,i));
									bank = "-";
									curr = "IDR";
									kurs = "1";
								}								
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_bukti.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(6,i)+"','"+this.sg.cells(7,i)+"',"+parseNilai(this.sg.cells(8,i))+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','-','-','"+this.app._lokasi+"','KB','"+this.sg.cells(9,i)+"','"+this.e_periode.getText()+"','"+curr+"',"+kurs+",'"+this.app._userLog+"',getdate(),'"+bank+"',"+nilaicurr+")");
								sql.add("update gr_kaslist_d set no_kas='"+this.e_nb.getText()+"' where modul='"+this.c_modul.getText()+"' and no_bukti='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				for (var i=0;i < this.sg.getRowCount();i++){					
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (nilaiToFloat(this.e_debet.getText()) != nilaiToFloat(this.e_kredit.getText())) {
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit tidak sama.");
					return false;						
				}
				if (nilaiToFloat(this.e_debet.getText()) <= 0 || nilaiToFloat(this.e_kredit.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total Debet atau Kredit tidak boleh nol atau kurang.");
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
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-BK"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}
	},
	doChange:function(sender){
		if (sender == this.c_modul) {	
			this.cb_bukti.setText("","");
			switch(this.c_modul.getText()){
				case "SPB" :
						var strSQL = "select no_spb as no_bukti,keterangan "+
									 "from gr_spb_m where no_kas='-' and no_kaslist<>'-' and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
					break;				
					
			}
			this.cb_bukti.setSQL(strSQL,["no_bukti","keterangan"],false,["No Bukti","Keterangan"],"and","Data Bukti",true);
		}
		if (sender == this.cb_bukti) {				
			switch(this.c_modul.getText()){
				case "SPB" :
						var strSQL = "select a.kode_curr,a.kurs,a.nilai,b.via,b.no_bg,b.kode_bank+' | '+c.nama as bank,d.kode_akun+' | '+d.nama as akun,d.kode_akun,d.nama as nama_akun,b.kode_bank "+
									 "from gr_spb_m a inner join gr_kaslist_d b on a.no_kaslist=b.no_kaslist and a.kode_lokasi=b.kode_lokasi "+
									 "                inner join bank c on b.kode_bank=c.kode_bank and b.kode_lokasi=c.kode_lokasi "+
									 "                inner join masakun d on c.kode_akun=d.kode_akun and d.kode_lokasi=c.kode_lokasi "+
									 "where a.no_spb='"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){								
								this.e_curr.setText(line.kode_curr);
								this.e_kurs.setText(floatToNilai(line.kurs));
								this.e_nilai.setText(floatToNilai(line.nilai));								
								this.e_bank.setText(line.bank);
								this.e_akun.setText(line.akun);
								this.e_via.setText(line.via);
								this.e_bg.setText(line.no_bg);
								
								this.kodebank = line.kode_bank;
								this.kodeakun = line.kode_akun;
								this.namaakun = line.nama_akun;
								this.kursspb = parseFloat(line.kurs);
							} 
						}					
					break;									
			}			
		}		
		if (sender == this.e_curr) {			
			if (this.e_curr.getText() == "IDR") {
				this.e_kurs.setReadOnly(true); this.e_kurs.setText("1"); this.sg.clear(1);
			}
			else {
				this.e_kurs.setReadOnly(false); this.e_kurs.setText("0"); this.sg.clear(1);
			}
		}
		if (sender == this.e_kurs) {
			this.sg.clear(1);
		}		
	},		
	doJurnal:function(sender){	
		if (this.cb_bukti.getText()!="" && this.e_ket.getText()!="") {
			var strSQL = "";
			switch(this.c_modul.getText()){
				case "SPB" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,'SPB' as jenis "+
									 "from gr_spb_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "                inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
									 "                left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4) "+
									 "where a.no_spb = '"+this.cb_bukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					break;				
					
			}
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,line.keterangan,line.dc,floatToNilai(line.nilai),line.jenis.toUpperCase()]);
				}
				var nilai = Math.round(nilaiToFloat(this.e_nilai.getText()) * nilaiToFloat(this.e_kurs.getText())); 
				this.sg.appendData([this.kodeakun,this.namaakun,this.app._kodePP,this.app._namaPP,"-","-",this.e_ket.getText(),"C",floatToNilai(nilai),"KB"]);
				
				if (nilaiToFloat(this.e_kurs.getText()) != this.kursspb) {
					var sls = (nilaiToFloat(this.e_kurs.getText()) - this.kursspb) * nilaiToFloat(this.e_nilai.getText());
					if (sls > 0) this.sg.appendData([this.rgKurs,this.rgNama,this.app._kodePP,this.app._namaPP,"-","-",this.e_ket.getText(),"D",floatToNilai(sls),"SK"]);
					else this.sg.appendData([this.lbKurs,this.lbNama,this.app._kodePP,this.app._namaPP,"-","-",this.e_ket.getText(),"C",floatToNilai(Math.abs(sls)),"SK"]);					
				}
			} else this.sg.clear(1);			
			this.sg.validasi();
		} 
		else system.alert(this,"Bukti dan Keterangan tidak valid.","Harap dilengkapi.");
	},
	doNilaiChange: function(){
		try{
			var debet=kredit=0; 
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(8,i) != ""){					
					if (this.sg.cells(7,i) == "D") debet += nilaiToFloat(this.sg.cells(8,i));
					if (this.sg.cells(7,i) == "C") kredit += nilaiToFloat(this.sg.cells(8,i));
				}
			}
			this.e_debet.setText(floatToNilai(debet));			
			this.e_kredit.setText(floatToNilai(kredit));			
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
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1);
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});