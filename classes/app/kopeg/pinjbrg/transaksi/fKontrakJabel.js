window.app_kopeg_pinjbrg_transaksi_fKontrakJabel = function(owner){
	if (owner){
		try{		
			window.app_kopeg_pinjbrg_transaksi_fKontrakJabel.prototype.parent.constructor.call(this, owner);
			this.className  = "app_kopeg_pinjbrg_transaksi_fKontrakJabel";						
			owner.childFormConfig(this, "mainButtonClick","Kontrak Kredit Barang Intern: Input", 0);
			this.maximize();
			//------------------------ login data ------------------------	
			uses("portalui_saiCBB;portalui_datePicker;portalui_radioButton;portalui_checkBox;server_report_report;portalui_reportViewer");
			this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
			this.lTgl = new portalui_label(this,{bound:[20,21,100,18],caption:"Tanggal",underline:true});
			this.dTgl = new portalui_datePicker(this,{bound:[120,21,100,18], selectDate:[this,"doSelectDate"]});
			this.cStatus = new portalui_saiCB(this,{bound:[20,22,200,20],caption:"Status Bayar",items:["AUTODEBET","CASH"],tag:2});
			this.eKontrak = new portalui_saiLabelEdit(this,{bound:[20,23,290,20],caption:"No Bukti",readOnly:true});			
			this.bGen = new portalui_button(this,{bound:[320,23,80,18],caption:"Generate", click:[this,"doClick"]});			
			this.eDok = new portalui_saiLabelEdit(this,{bound:[20,25,290,20],caption:"No Kontrak", readOnly:true});
			this.eMou = new portalui_saiLabelEdit(this,{bound:[20,35,290,20],caption:"No Dokumen"});
			this.lTgl = new portalui_label(this,{bound:[20,21,100,18],caption:"Tgl Awal Angsur",underline:true});
			this.dTgl2 = new portalui_datePicker(this,{bound:[120,21,100,18]});
			this.lTgl = new portalui_label(this,{bound:[20,24,100,18],caption:"Jenis Angsuran",underline:true});
			this.rb1 = new portalui_radioButton(this,{bound:[130,24,100,20],caption:"Anuitas", change:[this,"doRadioSelected"]});
			this.rb2 = new portalui_radioButton(this,{bound:[230,24,100,20],caption:"Flat",selected:true, change:[this,"doRadioSelected"]});
			this.eKet = new portalui_saiLabelEdit(this,{bound:[20,26,500,20],caption:"Keterangan"});
			this.cbbAgg = new portalui_saiCBBL(this,{bound:[20,27,200,20],caption:"Nasabah", btnClick:[this,"FindBtnClick"],change:[this,"doChange"]});			
			this.cbbOrder = new portalui_saiCBB(this,{bound:[20,33,200,20],caption:"No Order",btnClick:[this,"FindBtnClick"],btnRefreshClick:[this,"doLoadData"]});			
			this.eUM = new portalui_saiLabelEdit(this,{bound:[320,33,200,20],caption:"Nilai UM", tipeText:ttNilai, change:[this,"doChange"],text:"0"});
			this.cbbApp = new portalui_saiCBBL(this,{bound:[20,28,200,20],caption:"NIK Approval", btnClick:[this,"FindBtnClick"],tag:2});			
			this.eNilai = new portalui_saiLabelEdit(this,{bound:[20,29,200,20],caption:"Nilai Kredit", tipeText:ttNilai, text:"0", change:[this,"editChange"],readOnly:true});
			this.eLama = new portalui_saiLabelEdit(this, {bound:[320,29,200,20],caption:"Lama Bayar",tipeText:ttNilai, text:"0", change:[this,"editChange"]});
			this.eBunga = new portalui_saiLabelEdit(this,{bound:[700,29,200,20],caption:"Bunga(%) / Tahun",tipeText:ttNilai, text:"0", change:[this,"editChange"]});
			this.eMaterai = new portalui_saiLabelEdit(this,{bound:[20,30,200,20],caption:"Biaya Materai",tipeText:ttNilai, text:"0", change:[this,"editChange"]});
			this.eProvisi = new portalui_saiLabelEdit(this,{bound:[320,30,200,20],caption:"Biaya Administrasi",tipeText:ttNilai, text:"0", change:[this,"editChange"]});
			this.eAsur = new portalui_saiLabelEdit(this,{bound:[700,30,200,20],caption:"By Asuransi (+)",tipeText:ttNilai,text:"0", change:[this,"doChange"]}); //nilai asur menambah nilai kontrak diluar total biaya
			this.eBiaya = new portalui_saiLabelEdit(this,{bound:[20,31,200,20],caption:"Total Biaya-Biaya",tipeText:ttNilai, readOnly:true, text:"0"});
			this.eBungaBln = new portalui_saiLabelEdit(this,{bound:[320,31,200,20],caption:"Nilai Bunga/Bln",tipeText:ttNilai, readOnly:true, text:"0"});
			this.cb_preview = new portalui_checkBox(this,{bound:[700,31,100,20], caption:"Preview", checked:true});
			this.eTagihan = new portalui_saiLabelEdit(this,{bound:[20,32,200,20],caption:"Nilai Tagihan/Bln",tipeText:ttNilai, readOnly:true, text:"0"});
			this.ePokokBln = new portalui_saiLabelEdit(this,{bound:[320,32,200,20],caption:"Nilai Pokok/Bln",tipeText:ttNilai, readOnly:true, text:"0"});
			this.ePiutang = new portalui_saiLabelEdit(this,{bound:[700,32,200,20],caption:"Nilai Piutang",tipeText:ttNilai, readOnly:true, text:"0"});
			this.i_viewer = new portalui_imageButton(this,{bound:[900,32,20,20],hint:"Hitung",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungClick"]});
			this.p2 = new portalui_panel(this,{bound:[20,225,900,145],caption:"Item Order Barang"});
			this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,20,895,115],colCount:11,tag:2,
		            colTitle:["Status","Kode Vndr","Nama Vendor","Kode","Nama","Tipe","Satuan","Harga","Jumlah","SubTtl","Akun Pnjualan"],
					colWidth:[[0,1,2,3,4,5,6,7,8,9,10],[60,60,140,60,140,130,40,80,40,90,0]],colFormat:[[7,8,9],[cfNilai,cfNilai,cfNilai]],
					columnReadOnly:[true,[2,3,4,5,6,9,10],[0,1,7,8]],buttonStyle:[[0,1],[bsAuto,bsEllips]],
					picklist:[[0],[new portalui_arrayMap({items:["APP","NON"]})]],colHide:[[10],true],
					defaultRow:1,autoAppend:true,
					ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doSgChange"]});									
			
			this.p1 = new portalui_panel(this,{bound:[20,38,497,388],caption:"Schedule Angsuran",visible:false});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,490,362],colCount:5,colWidth:[[4,3,2,1,0],[80,90,90,90,90]],colTitle:["Saldo Awal","Pokok","Margin","Saldo Akhir","Tgl Tagih"],
                     colFormat:[[0,1,2,3],[cfNilai, cfNilai, cfNilai, cfNilai, cfDate]], readOnly:true,defaultRow:1});
            
			this.rearrangeChild(10,22);
			setTipeButton(tbSimpan);
					
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
			this.setTabChildIndex();			
			this.dataAngsuran = [];
			this.ePeriode.setText(this.dTgl.getThnBln());			
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('PBRGIM','PBRGTP','PBRGAD','PBRGHA','PBRGMT') and kode_lokasi = '"+this.app._lokasi+"' ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "PBRGIM") this.akunIM = line.flag;
					if (line.kode_spro == "PBRGTP") this.akunTP = line.flag;
					if (line.kode_spro == "PBRGAD") this.akunAD = line.flag;
					if (line.kode_spro == "PBRGHA") this.akunHA = line.flag;
					if (line.kode_spro == "PBRGMT") this.akunMT = line.flag;
				}
			}
			this.cbbAgg.setSQL("select kode_agg, nama  from kop_agg where kode_lokasi ='"+this.app._lokasi+"'",["kode_agg","nama"],true);
			this.cbbApp.setSQL("select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",["nik","nama"],true);
			var sql = new server_util_arrayList();
			sql.add("select kode_vendor, nama from vendor where kode_lokasi='"+this.app._lokasi+"'"); 			
			this.dbLib.getMultiDataProviderA(sql);
			this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
			this.viewer.hide();
			this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
			this.report = new server_report_report();
			this.report.addListener(this);
		}catch(e){
			systemAPI.alert("[app_kopeg_pinjbrg_transaksi_fKontrakJabel]::oncreate lib : ",e);
		}
	}
};
window.app_kopeg_pinjbrg_transaksi_fKontrakJabel.extend(window.portalui_childForm);
window.app_kopeg_pinjbrg_transaksi_fKontrakJabel.implement({
	mainButtonClick : function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		else if (sender == this.app._mainForm.bSimpan){
            if (this.dTgl2.getThnBln() < this.ePeriode.getText()){
              system.alert(this,"Periode tagih harus sama atau lebih besar dari periode input.","");  
              return;
            } 
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		}else if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
		else if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{				
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					this.eKontrak.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_pbrg_m','no_pbrg',this.app._lokasi+"-PBRG"+this.ePeriode.getText().substr(2,4)+".",'0000'));
					this.eDok.setText(this.eKontrak.getText());
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.rb1.isSelected()) var jnsAngs = 'A';								
					else if (this.rb2.isSelected()) var jnsAngs = 'F';
					this.generateSch();
					sql.add("update kop_jual_m set progress= '1' where no_jual = '"+this.cbbOrder.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");										
					for (var i=0; i < this.sg2.rows.getLength(); i++){
					  if (this.sg2.cells(0,i) == "APP") {
						sql.add("update kop_jual_d set no_spb='INTERN',harga_kont="+parseNilai(this.sg2.cells(7,i))+",jumlah_kont="+parseNilai(this.sg2.cells(8,i))+",status='2',kode_vendor='"+this.sg2.cells(1,i)+"' where no_jual='"+this.cbbOrder.getText()+"' and kode_brg='"+this.sg2.cells(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
						}
					}
					var j = 0;
					for (var i=0; i < this.sg1.rows.getLength(); i++){
					  j = i+1;					
					  sql.add("insert into kop_pbrg_sch(no_pbrg,no_kontrak,kode_lokasi,cicilan_ke,npokok,nbunga,saldo,tgl_angs,status_gen,no_bill) values "+
						      "('"+this.eKontrak.getText()+"','"+this.eDok.getText()+"','"+this.app._lokasi+"',"+j+","+parseNilai(this.sg1.cells(1,i))+","+parseNilai(this.sg1.cells(2,i))+","+parseNilai(this.sg1.cells(3,i))+",'"+this.sg1.getCell(4,i).substr(6,4)+'/'+this.sg1.getCell(4,i).substr(3,2)+'/'+this.sg1.getCell(4,i).substr(0,2)+"',0,'-')");
					}	
					var vPosted = "X";
					if ((this.eMaterai.getText() != "0") || (this.eProvisi.getText() != "0") || (this.eUM.getText() != "0"))  { //|| (this.eAsur.getText() != "0") masuk sebagai nilai kontrak
						var totLain = nilaiToFloat(this.eMaterai.getText()) + nilaiToFloat(this.eProvisi.getText()) + nilaiToFloat(this.eUM.getText()); //+ nilaiToFloat(this.eAsur.getText()) masuk sebagai nilai kontrak
						var d="insert into kop_pbrg_j (no_pbrg,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";
						var idx = 0;
						vPosted = "F";
						d += "('"+this.eKontrak.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunIM+"','"+this.eKet.getText()+"','D',"+totLain+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','ARIM','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					}										
					if (this.eUM.getText() != "0") {
						idx++;
						d+= ",";
						d += "('"+this.eKontrak.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunTP+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eUM.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','TTP_UM','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";					
					}
					if (this.eMaterai.getText() != "0") {
						idx++;
						d+= ",";
						d += "('"+this.eKontrak.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunMT+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eMaterai.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','PDPT_MAT','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					}
					if (this.eProvisi.getText() != "0") {
						idx++;
						d+= ",";
						d += "('"+this.eKontrak.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunAD+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eProvisi.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','PDPT_ADM','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					}
					/* masuk ke nilai kontrak
					if (this.eAsur.getText() != "0") {
						idx++;
						d+= ",";
						d += "('"+this.eKontrak.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunHA+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eAsur.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PBRG','HASUR','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
					}
					*/					
					if (vPosted == "F") sql.add(d);
					sql.add("insert into kop_pbrg_m (no_pbrg,no_kontrak,no_jual,keterangan,tanggal,periode,tgl_tagih,kode_agg,status_bayar,jenis_angs, "+
					  	    "nilai,p_bunga,lama_bayar,nilai_mat,nilai_adm,nilai_asur,nilai_bunga,nilai_pokok,nilai_tagihan, "+
						    "progress,akun_piutang,akun_pjasa,nik_app,status_aktif,progress_um,nik_user,tgl_input,kode_lokasi,posted,kode_curr,kode_pp,no_spbasur,no_mou,nilai_um) values "+
						    "('"+this.eKontrak.getText()+"','"+this.eDok.getText()+"','"+this.cbbOrder.getText()+"','"+this.eKet.getText()+"','"+this.dTgl.getDateString()+"','"+this.ePeriode.getText()+"','"+this.dTgl2.getDateString()+"','"+this.cbbAgg.getText()+"','"+this.cStatus.getText().substr(0,1)+"','"+jnsAngs+"', "+
						    " "+parseNilai(this.eNilai.getText())+","+parseNilai(this.eBunga.getText())+","+parseNilai(this.eLama.getText())+","+parseNilai(this.eMaterai.getText())+","+parseNilai(this.eProvisi.getText())+","+parseNilai(this.eAsur.getText())+","+parseNilai(this.eBungaBln.getText())+","+parseNilai(this.ePokokBln.getText())+","+parseNilai(this.eTagihan.getText())+", "+
						    "'0','-','-','"+this.cbbApp.getText()+"','1','0','"+this.app._userLog+"',now(),'"+this.app._lokasi+"','"+vPosted+"','IDR','"+this.app._kodePP+"','X','"+this.eMou.getText()+"',"+parseNilai(this.eUM.getText())+")"); //no_spbasur <--- diisi "X" karena nilai asur masuk ke kontrak jd gak ada uang yg dititipkan
					this.nilaiUA = nilaiToFloat(nilaiToFloat(this.eUM.getText()) + nilaiToFloat(this.eProvisi.getText()));	
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.eKontrak);		
					this.sg1.clear(1); this.sg2.clear(1);
				}
				break;
			case "simpan" :	
				for (var i=0; i < this.sg2.rows.getLength(); i++){
					if (this.sg2.cells(0,i) == "APP" && this.sg2.cells(1,i) == "-") {
					    i=i+1;
						system.alert(this,"Kolom Vendor harus dipilih. [baris "+i+"].","");
						return false;
					}
				}	
				var line,data = this.dbLib.runSQL("select no_kontrak from kop_pbrg_m "+
					   					          "where no_kontrak = '"+this.eDok.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
				if (data instanceof portalui_arrayMap){
					line = data.get(0);
					if (line != undefined){
						system.alert(this,"No Kontrak sudah terpakai.","");
						return false;
					} 
				}
				if (nilaiToFloat(this.eNilai.getText()) <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai pengajuan tidak boleh kurang dari atau sama dengan nol.");
					return false;
				}
				if (parseFloat(this.app._periode) > parseFloat(this.ePeriode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.ePeriode.getText())) {
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
	doClick: function(sender){
		if (sender == this.bGen){
			this.eKontrak.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_pbrg_m','no_pbrg',this.app._lokasi+"-PBRG"+this.ePeriode.getText().substr(2,4)+".",'0000'));
			this.eDok.setText(this.eKontrak.getText());
			this.eMou.setFocus();
		}
	},
	doHitungClick: function(sender){
		this.p1.hide();
		if ((this.eLama.getText() != "0") && (this.eNilai.getText() != "0") && (this.eBunga.getText() != "0")) {
			this.generateSch();
			if (this.p1.visible == false) this.p1.show();
			else this.p1.hide();
		}
	},
	doChange: function(sender){
		if (sender == this.cbbAgg) this.cb_cust.setSQL("select kode_agg, nama  from kop_agg where kode_lokasi ='"+this.app._lokasi+"'",["kode_agg","nama"],true);
		if (sender == this.eUM || sender == this.eAsur) this.sg2.validasi();
	},
	doLoadData: function(sender){		
		this.eUM.setText(this.cbbOrder.dataFromList[2]);
		var data = this.dbLib.getDataProvider("select b.kode_brg,b.nama,b.tipe,b.sat,a.harga,a.jumlah,a.harga*a.jumlah as tot,c.akun_jual "+
		                                      "from kop_jual_d a "+
		                                      "   inner join kop_brg b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
											  "   inner join kop_brg_klp c on c.kode_klpbrg=b.kode_klpbrg and c.kode_lokasi=b.kode_lokasi "+
		                                      "where a.no_jual = '"+this.cbbOrder.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'");
		eval("data = "+data+";");
		if (typeof data == "object"){
			var line;
			line = data.rs.rows[0];
			this.sg2.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];				
				this.sg2.appendData(["NON","-","-",line.kode_brg,line.nama,line.tipe,line.sat,floatToNilai(line.harga),floatToNilai(line.jumlah),floatToNilai(line.tot)]);
			}
			this.sg1.validasi();
		}
	},
	FindBtnClick: function(sender){
	    try{          
    		if (sender == this.cbbOrder){
    			if (this.cbbAgg.getText() != "") {
					this.standarLib.showListData(this, "Daftar Order Nasabah",sender,undefined, 
	    										  "select no_jual, keterangan, nilai_um from kop_jual_m where kode_agg='"+this.cbbAgg.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and no_del='-' and progress='0'",
	    										  "select count(no_jual)      from kop_jual_m where kode_agg='"+this.cbbAgg.getText()+"' and kode_lokasi ='"+this.app._lokasi+"' and no_del='-' and progress='0'",
	    										  ["no_jual","keterangan","nilai_um"],"and",["No Order","Keterangan","Nilai UM"],false);
					this.sg1.clear(1); this.sg2.clear(1);
				}
			}
			if (sender == this.cbbAgg){
    			this.standarLib.showListData(this, "Daftar Nasabah",sender,undefined, 
    										  "select kode_agg, nama from kop_agg where kode_lokasi ='"+this.app._lokasi+"'  ",
    										  "select count(kode_agg) from kop_agg where kode_lokasi ='"+this.app._lokasi+"' ",
    										  ["kode_agg","nama"],"and",["Kode Nasabah","Nama"],false);
    		}
    		if (sender == this.cbbApp){
    			this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
    										  "select nik, nama from karyawan where kode_lokasi ='"+this.app._lokasi+"'  ",
    										  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"' ",
    										  ["nik","nama"],"and",["NIK","Nama"],false);
    		}
   		}catch(e){
   		    alert(e);                
        }
	},
	doEllipseClick: function(sender, col, row){
		try{						
			if (col == 1){
				this.standarLib.showListData(this, "Daftar Vendor",sender,undefined, 
											  "select kode_vendor,nama    from vendor where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_vendor)  from vendor where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_vendor","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0){
			this.sg2.validasi();
		}
		sender.onChange.set(undefined,undefined);
		if (col == 1){	
			var brg = this.dataBrg.get(sender.cells(1,row));
			if(brg) {
				sender.cells(2,row,brg.nama);
			}
			else {                                    
				if (trim(sender.cells(1,row)) != "") system.alert(this,"Vendor "+sender.cells(1,row)+" tidak ditemukan","Coba kode yang lainnya.","");                
				sender.cells(2,row,"");
			}
		}
		sender.onChange.set(this,"doChangeCell");
		if ((col == 7) || (col == 8)){
			if ((this.sg2.getCell(7,row) != "") && (this.sg2.getCell(8,row) != "")) {
				var subttl = nilaiToFloat(this.sg2.getCell(7,row)) * nilaiToFloat(this.sg2.getCell(8,row));
				this.sg2.setCell(9,row,floatToNilai(subttl));
			}
			this.sg2.validasi();
		}		
	},
	doSgChange: function(sender, col, row){		
		var tot = 0;			
		for (var i = 0;i < this.sg2.getRowCount();i++){
			if (this.sg2.cells(9,i) != "" && this.sg2.cells(0,i) == "APP") 
				tot += nilaiToFloat(this.sg2.cells(9,i));
		}	
		tot = tot + nilaiToFloat(this.eAsur.getText()) - nilaiToFloat(this.eUM.getText());
		this.eNilai.setText(floatToNilai(tot));
	},
	generateSch: function(){
	    try{         
            var lm = nilaiToFloat(this.eLama.getText());
    		var so = nilaiToFloat(this.eNilai.getText());
    		var bunga = nilaiToFloat(this.eBunga.getText());				
    		var pokok = Math.round(so / lm);
    		var margin = Math.round(so * bunga / 100 / 12);
    		var tot = so + (margin * lm);
    		var angs = Math.round(tot / lm);
    		var pay = so;
    		this.ePiutang.setText(floatToNilai(so+margin));
    		this.eTagihan.setText(floatToNilai(angs));
			
			var tglNext = perAwal = this.dTgl2.getThnBln();
			var tgl = this.dTgl2.getText().substr(0,2);
            this.dataAngsuran = [];
            this.sg1.clear();
    		for (var i = 0;i < lm;i++){
				tglNext = tgl + '/' + perAwal.substr(4,2) + '/' +  perAwal.substr(0,4);
    			if (this.rb2.isSelected()){								
    				this.dataAngsuran.push([floatToNilai(so),floatToNilai(pokok),floatToNilai(margin),floatToNilai(so - pokok),tglNext]);
    				so = so - pokok;
    				if (so < pokok) pokok = so;
    				else if ( i == lm - 2) pokok = so; 
    			}else{					
    				var value = annuity(bunga /12 / 100, lm - i, lm, so);					
    				eval("value = "+value+";");
                    this.dataAngsuran.push([floatToNilai(value.totPayment),floatToNilai(value.pokok),floatToNilai(value.margin),floatToNilai(value.totPayment - value.pokok),tglNext]);
    				this.eTagihan.setText(floatToNilai(value.payment));
    				pokok = value.pokok;
    				margin = value.margin;
    			}
    			if (i == 0) {
                    this.eBungaBln.setText(floatToNilai(margin));
                    this.ePokokBln.setText(floatToNilai(pokok));
                }
                perAwal = getNextPeriode(perAwal);
				this.sg1.appendData(this.dataAngsuran[i]);
    		}
   		}catch(e){
           alert(e);
        }
    },
    doSelectDate: function(sender, y, m, d){
       this.ePeriode.setText(sender.getThnBln());
    },
    editChange:function(sender){
	   if ((sender == this.eMaterai) || (sender == this.eProvisi)){
          this.eBiaya.setText(floatToNilai(nilaiToFloat(this.eMaterai.getText()) + nilaiToFloat(this.eProvisi.getText())));
       }
	   if (sender == this.eNilai) {
		this.eBungaBln.setText("0");	
		this.ePokokBln.setText("0");	
		this.ePiutang.setText("0");	
		this.eTagihan.setText("0");	
	   }
    },
    doRadioSelected: function(sender,selected){                     
        if ((this.eLama.getText() != "0") && (this.eNilai.getText() != "0") && (this.eBunga.getText() != "0")) this.generateSch();        
    },
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							 							
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.eKontrak.getText()+")");							
							if (this.cb_preview.isSelected()) {
								this.nama_report="server_report_kopeg_rptAngs3";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pbrg='"+this.eKontrak.getText()+"' ";			
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								//this.report.preview(this.nama_report,this.filter,1,1,this.showFilter, this.app._namalokasi,this.filter2);
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;
							} else this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
					eval("result = "+result+";");
					if (typeof result != "string"){
						this.dataBrg = new portalui_arrayMap();
						if (result.result[0]){	    			        
							var line;
							for (var i in result.result[0].rs.rows){
								line = result.result[0].rs.rows[i];
								this.dataBrg.set(line.kode_vendor, line);
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
	doCloseReportClick: function(sender)
	{
		switch(sender.getName())
		{
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
				this.standarLib.clearByTag(this, new Array("0","1"),this.eKontrak);		
				this.sg1.clear(1); this.sg2.clear(1);
			break;
		}
	}
});
