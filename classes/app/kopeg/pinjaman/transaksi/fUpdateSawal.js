window.app_kopeg_pinjaman_transaksi_fUpdateSawal = function(owner){
	if (owner){
		try{		
			window.app_kopeg_pinjaman_transaksi_fUpdateSawal.prototype.parent.constructor.call(this, owner);
			this.className  = "app_kopeg_pinjaman_transaksi_fUpdateSawal";
			owner.childFormConfig(this, "mainButtonClick","Update Saldo Awal", 0);
			this.maximize();
			//------------------------ login data ------------------------	
			uses("saiCBBL;saiCBB;datePicker;radioButton;uploader;checkBox");
			this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,20,200,20],caption:"Periode",readOnly:true,tag:2});
			this.lTgl = new portalui_label(this,{bound:[20,21,100,20],caption:"Tanggal",underline:true});
			this.dTgl = new portalui_datePicker(this,{bound:[120,21,100,18],selectDate:[this,"doSelectDate"]});
			this.eBukti = new portalui_saiLabelEdit(this,{bound:[20,23,290,20],caption:"No Transaksi",readOnly:true});
			this.bGen = new portalui_button(this,{bound:[320,23,80,18],caption:"Generate", click:[this,"doClick"]});
			this.cbbPinj = new portalui_saiCBB(this, {
				bound: [20, 28, 290, 20],
				caption: "No Pinjaman",
				btnRefreshClick: [this, "doLoadData"],
				multiSelection: false,
				sql: ["select no_pinj, keterangan from kop_pinj_m where kode_lokasi ='"+this.app._lokasi+"'",["no_pinj","keterangan"],false,["No Pinj","Keterangan"],"and","Daftar Pinjaman",true ]
			});
			this.eKet = new portalui_saiLabelEdit(this,{bound:[20,26,550,20],caption:"Keterangan"});			
			this.eAkunPokok = new portalui_saiLabelEdit(this,{bound:[20,27,200,20], caption:"Akun Pokok", readOnly:true});
			this.eAkunJasa = new portalui_saiLabelEdit(this,{bound:[370,27,200,20], caption:"Akun Jasa", readOnly:true});
			this.lTgl = new portalui_label(this,{bound:[20,21,100,20],caption:"Tanggal Awal Tagih",underline:true});
			this.dTgl2 = new portalui_datePicker(this,{bound:[120,21,100,18],selectDate:[this,"doSelectDate"]});

			this.bUpdtTgl = new portalui_button(this,{bound:[490,21, 80,20],caption:"Update Tgl", click:"doClick"});
			this.bUpdtBill = new portalui_button(this,{bound:[1060,21, 80,20],caption:"Regenerate", click:"doClick"});
            this.p1 = new portalui_panel(this,{bound:[20,35,550,320],caption:"Daftar Schedule"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,548,265],colCount:5,
			    colTitle:"Tgl Angsur, Nilai Pokok, Nilai Bunga, Nilai Tagihan, Saldo ",
                colWidth:[[4,3,2,1,0],[100,100,100,100,100]],
				colFormat:[[1,2,3,4],[cfNilai,cfNilai,cfNilai,cfNilai]],
                columnReadOnly:[true,[1,2,3,4],[]],defaultRow:1,
				change:[this,"doChangeCell"],nilaiChange:[this,"doSgChange"]});
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,288,548,25],grid:this.sg, buttonStyle:bsViewExt, pager:[this,"doPager"]});
			
			this.p3 = new portalui_panel(this,{bound:[590,35,550,320],caption:"Daftar Bill"});
			this.p3.sg = new portalui_saiGrid(this.p3,{bound:[0,20,548,265],colCount:6,tag:9,
						colTitle:"No Bill, Tanggal, Nilai Pokok, Nilai Jasa, Nilai Tagihan, Akun Pdpt",
						colWidth:[[5,4,3,2,1,0],[100,100,100,100,100,100]],colFormat:[[2,3,4],[cfNilai, cfNilai, cfNilai]],
						readOnly:true,
						defaultRow:1});
			this.p3.sgn = new portalui_sgNavigator(this.p3,{bound:[1,288,548,25],grid:this.p3.sg, buttonStyle:bsViewExt, pager:[this,"doPager"]});
			
			this.p4 = new portalui_panel(this,{bound:[20,36,550,320],caption:"Daftar Angsuran"});
			this.p4.sg = new portalui_saiGrid(this.p4,{bound:[0,20,548,265],colCount:5,tag:9,
						colTitle:"No Angsuran,Tanggal,Nilai Pokok,Nilai Bunga, Nilai Tagihan",
						colWidth:[[4,3,2,1,0],[100,100,100,100,120]],colFormat:[[2,3,4],[cfNilai, cfNilai,cfNilai]],				
						readOnly:true,
						defaultRow:1});				
			this.p4.sgn = new portalui_sgNavigator(this.p4,{bound:[1,288,548,25],grid:this.p4.sg, buttonStyle:bsViewExt, pager:[this,"doPager"]});
						
			this.p2 = new portalui_panel(this,{bound:[590,36,550,320],caption:"Data Jurnal"});
			this.sg2 = new portalui_saiGrid(this.p2,{bound:[0,20,548,265],colCount:13,tag:9,
						colTitle:["MODUL","No Bukti","Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode PP","Nama PP","Kode RKM","Nama RKM","Periode","Modul"],
						colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[80,80,150,80,150,80,100,50,150,150,80,100,80]],colFormat:[[7],[cfNilai]],						
						columnReadOnly:[true,[1,8,10],[0]],nilaiChange:[this,"doNilaiChange2"],change:[this,"doChangeCell2"],autoAppend:true,defaultRow:1});
			this.sgn2 = new portalui_sgNavigator(this.p2,{bound:[0,288,548,25],buttonStyle:bsViewExt,grid:this.sg2});		
			
			this.p5 = new portalui_panel(this,{bound:[20,37,550,320],caption:"Data Bill Baru"});
			this.p5.sg = new portalui_saiGrid(this.p5,{bound:[0,20,548,265],colCount:6,tag:9,
						colTitle:"No Bill, Tanggal, Nilai Pokok, Nilai Jasa, Nilai Tagihan, Akun Pdpt",
						colWidth:[[5,4,3,2,1,0],[100,100,100,100,100,100]],colFormat:[[2,3,4],[cfNilai, cfNilai, cfNilai]],
						readOnly:true,
						defaultRow:1});			
			this.p5.sgn = new portalui_sgNavigator(this.p5,{bound:[1,288,548,25],grid:this.p5.sg, buttonStyle:bsViewExt, pager:[this,"doPager"]});
						
			this.p6 = new portalui_panel(this,{bound:[590,37,550,320],caption:"Data Angsur Baru"});
			this.p6.sg = new portalui_saiGrid(this.p6,{bound:[0,20,548,265],colCount:5,tag:9,
						colTitle:"No Angsuran,Tanggal,Nilai Pokok,Nilai Bunga, Nilai Tagihan",
						colWidth:[[4,3,2,1,0],[100,100,100,100,120]],colFormat:[[2,3,4],[cfNilai, cfNilai,cfNilai]],				
						readOnly:true,
						defaultRow:1});	
			this.p6.sgn = new portalui_sgNavigator(this.p6,{bound:[0,288,548,25],buttonStyle:bsViewExt,grid:this.p6.sg});		
			
			this.rearrangeChild(10,22);
			setTipeButton(tbSimpan);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
			this.setTabChildIndex();			
			this.dataAngsuran = [];
			this.ePeriode.setText(this.dTgl.getThnBln());
			var data = this.dbLib.getDataProvider("select kode_spro,flag,value1 from spro where kode_spro in ('PINJIM','PINJTP','PINJUD','PINJPD','PINJOE') and kode_lokasi = '"+this.app._lokasi+"' ", true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					if (line.kode_spro == "PINJIM") this.akunIM2 = line.flag;
					if (line.kode_spro == "PINJTP") this.akunTP = line.flag;
					if (line.kode_spro == "PINJUD") this.akunUDP = line.flag;
					if (line.kode_spro == "PINJPD") this.akunPdpt = line.flag;
					if (line.kode_spro == "PINJOE") this.akunBeban = line.flag;
				}
			}
		}catch(e){
			systemAPI.alert("[app_kopeg_pinjaman_transaksi_fUpdateSawal]::oncreate lib : ",e);
		}
	}
};
window.app_kopeg_pinjaman_transaksi_fUpdateSawal.extend(window.portalui_childForm);
window.app_kopeg_pinjaman_transaksi_fUpdateSawal.implement({
	mainButtonClick : function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		else if (sender == this.app._mainForm.bSimpan){
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		}else if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
		else if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{				
			if (this.cbbSpb.getText() == "" || this.cbbSpb.getText() == "-") {this.sg2.setTag(9); var vProg = "0"; var noSPB = "-";}
			else {this.sg2.setTag(1); var vProg = "1"; var noSPB = this.cbbSpb.getText();}
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					this.eBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pinjangs_m","no_angs",this.app._lokasi+"-PA"+this.ePeriode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into kop_updateswl(no_update, tanggal, periode, no_pinj, tgl_awal, tgl_akhir, nik_user, tgl_input)"+
						"values('"+this.eBukti.getText()+"', '"+this.dTgl.getDateString()+"','"+this.ePeriode.getText()+"', '"+this.cbbPinj.getText()+"', '"+this.tglAwal+"','"+this.dTgl2.getDateString()+"','"+this.app._userLog+"',now())");					
					var g = this.p5.sg;
					for (var i=0;i< g.getRowCount();i++){
						sql.add("insert into kop_updatesql_bill(no_update, no_bill, npokok, nbunga)values('"+this.eBukti.getText()+"','"+g.cells(0,i)+"', '"+parseNilai(g.cells(2,i))+"', '"+parseNilai(g.cells(3,i))+"' )");
					}	
					g = this.p6.sg;
					for (var i=0;i< g.getRowCount();i++){
						sql.add("insert into kop_updatesql_angs(no_update, no_angs, npokok, nbunga)values('"+this.eBukti.getText()+"','"+g.cells(0,i)+"', '"+parseNilai(g.cells(2,i))+"', '"+parseNilai(g.cells(3,i))+"' )");
					}			
					g = this.p3.sg;		
					//hapus data lama
					sql.add("delete from kop_pinjbill_d where no_pinj = '"+this.cbbPinj.getText()+"' and no_bill like '22-BILLPU%' ");
					//insert data baru untuk periode dibawah maret '10
					for (var i=0;i < g.getRowCount();i++){
						if (g.cells(1,i) > "201003")
							sql.add("insert into kop_pinjbill_d(no_bill, no_pinj, no_kontrak, kode_lokasi, cicilan_ke, npokok, nbunga, akun_pjasa, akun_pdpt, dc)"+
								" values('"+g.cells(0,i)+"','"+this.cbbPinj.getText()+"','"+this.cbbPinj.getText()+"', '"+this.app._lokasi+"','"+i+"', "+parseNilai(g.cells(2,i))+", "+parseNilai(g.cells(3,i))+", '"+this.eAkunJasa.getText()+"', '"+g.cells(5,i)+"','D')");
					}
					g = this.p5.sg;
					for (var i=0;i< g.getRowCount();i++){
						sql.add("insert into kop_pinjbill_d(no_bill, no_pinj, no_kontrak, kode_lokasi, cicilan_ke, npokok, nbunga, akun_pjasa, akun_pdpt, dc)"+
							" values('"+g.cells(0,i)+"','"+this.cbbPinj.getText()+"','"+this.cbbPinj.getText()+"', '"+this.app._lokasi+"','"+i+"', "+parseNilai(g.cells(2,i))+", "+parseNilai(g.cells(3,i))+", '"+this.eAkunJasa.getText()+"', '"+g.cells(5,i)+"','"+(nilaiToFloat(g.cells(3,i)) < 0 ? "C":"D" )+"')");
					}
					g = this.p4.sg;
					//hapus data lama
					sql.add("delete from kop_pinjangs_d where no_pinj = '"+this.cbbPinj.getText()+"' and no_angs like '22-ANSPJ%' ");
					//insert data baru untuk periode dibawah maret '10
					for (var i=0;i < g.getRowCount();i++){
						if (g.cells(1,i) > "201003")
							sql.add("insert into kop_pinjangs_d(no_angs, no_pinj, no_kontrak, kode_lokasi, tanggal, npokok, nbunga, akun_ar, dc)"+
								" values('"+g.cells(0,i)+"','"+this.cbbPinj.getText()+"','"+this.cbbPinj.getText()+"', '"+this.app._lokasi+"', "+
								" '"+"01-"+g.cells(1,i).substr(4)+ "-"+g.cells(1,i).substr(0,4)+"', "+parseNilai(g.cells(2,i))+", "+parseNilai(g.cells(3,i))+", '111006', 'D')");
					}
					g = this.p6.sg;
					for (var i=0;i< g.getRowCount();i++){
						sql.add("insert into kop_pinjangs_d(no_angs, no_pinj, no_kontrak, kode_lokasi, tanggal, npokok, nbunga, akun_ar, dc)"+
							" values('"+g.cells(0,i)+"','"+this.cbbPinj.getText()+"','"+this.cbbPinj.getText()+"', '"+this.app._lokasi+"', "+
							" '"+"01-"+g.cells(1,i).substr(4)+ "-"+g.cells(1,i).substr(0,4)+"', "+parseNilai(g.cells(2,i))+", "+parseNilai(g.cells(3,i))+", '111006', '"+(nilaiToFloat(g.cells(3,i)) < 0 ? "C":"D" )+"')");
					}
					
					//jurnal
					g = this.sg2;
					var posted = new portalui_arrayMap();
					for (var i=0;i < g.getRowCount();i++){						
						if (g.cells(0,i) == "BILL"){		
							if (this.dataBill.get(g.cells(11,i)).posted == "T"){
								if (g.cells(11, i) > this.app._periode){//insert into gldt
									sql.ad("insert into gldt_h");
								}else {				
									sql.ad("insert into gldt");
								}					
							}
							sql.add("insert into kop_pinjbill_j(no_bill, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, nilai, kode_pp, "+ 
									"kode_drk, kode_lokasi, modul, jenis, periode, kode_curr, kurs, nik_user, tgl_input )"+
									"values('"+g.cells(1,i)+"','"+this.cbbPinj.getText()+"', '"+this.dTgl.getDateString()+"','"+i+"','"+g.cells(2,i)+"', "+
									" '"+g.cells(4,i)+"','"+g.cells(5,i)+"','"+parseNilai(g.cells(6,i))+"','"+g.cells(7,i)+"','"+g.cells(9,i)+"', "+
									" '"+this.app._lokasi+"','PINJBILL','"+g.cells(12,i)+"','"+g.cells(11,i)+"','IDR',1,'"+this.app._userLog+"',now()) ");
						}else{
							if (this.dataAngs.get(g.cells(11,i)).posted == "T"){
								if (g.cells(11, i) > this.app._periode){//insert into gldt
									sql.ad("insert into gldt_h");
								}else {								
									sql.ad("insert into gldt");
								}					
							}
							sql.add("insert into kop_pinjangs_j(no_angs, no_dokumen, tanggal, no_urut, kode_akun, keterangan, dc, nilai, kode_pp, "+ 
									"kode_drk, kode_lokasi, modul, jenis, periode, kode_curr, kurs, nik_user, tgl_input )"+
									"values('"+g.cells(1,i)+"','"+this.cbbPinj.getText()+"', '"+this.dTgl.getDateString()+"','"+i+"','"+g.cells(2,i)+"', "+
									" '"+g.cells(4,i)+"','"+g.cells(5,i)+"','"+parseNilai(g.cells(6,i))+"','"+g.cells(7,i)+"','"+g.cells(9,i)+"', "+
									" '"+this.app._lokasi+"','PINJ','"+g.cells(12,i)+"','"+g.cells(11,i)+"','IDR',1,'"+this.app._userLog+"',now()) ");
						}
					}
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.eBukti);		
					this.sg1.clear(1);
					this.sg2.setTag(9);
					this.sg2.clear(1);					
				}
				break;
			case "simpan" :	
				this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
		}
	},
	doSelectDate: function(sender, y, m, d){
       this.ePeriode.setText(sender.getThnBln());
    },
	doChange: function(sender){
		if (sender == this.eFee) {
			var nFee = Math.round(nilaiToFloat(this.eFee.getText()) / 100 * nilaiToFloat(this.eAngs.getText()));
			this.eFeeNilai.setText(floatToNilai(nFee));
		}
		if (sender == this.eAngs) {
			var sls = nilaiToFloat(this.eAngs.getText()) - (nilaiToFloat(this.eTotPokok.getText()) + nilaiToFloat(this.eTotJasa.getText()));
			this.eSls.setText(floatToNilai(sls));
			var nFee = Math.round(nilaiToFloat(this.eFee.getText()) / 100 * nilaiToFloat(this.eAngs.getText()));
			this.eFeeNilai.setText(floatToNilai(nFee));
		}
	},
	doClick: function(sender){
		if (sender == this.bGen){
			this.eBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_updateswl","no_update",this.app._lokasi+"-UPD"+this.ePeriode.getText().substr(2,4)+".","0000"));
			this.eDok.setFocus();
		}
		if (sender == this.bUpdtTgl){
			var perAwal = this.dTgl2.getThnBln();
			var tgl = this.dTgl2.day;			
			for (var i = 0;i < this.sg1.getRowCount();i++){
				tglNext = (tgl < 10 ? "0":"")+tgl + '-' + perAwal.substr(4,2) + '-' +  perAwal.substr(0,4);	
				this.sg1.cells(0,i, tglNext);
				perAwal = getNextPeriode(perAwal);
			}
		}
		if (sender == this.bUpdtBill){
			try{
				this.sg2.clear();
				var perAwal = this.dTgl2.getThnBln();
				var tgl = this.dTgl2.day;
				var g = this.p3.sg;
				var akun = new portalui_arrayMap();
				for (var i = 0;i < g.getRowCount();i++){
					akun.set(g.cells(1,i), g.cells(5,i));
					if (g.cells(1,i) <= "201003" ) continue;
					//append ke jurnal				
					this.sg2.appendData(["BILL",g.cells(0,i), g.cells(5,i), 'Akun Pendapatan','Pembatalan Tagihan karena kesalahan data awal','D',g.cells(3,i), '01010000','Simpan Pinjam','-','-',g.cells(1,i),"PDPT"]);
					this.sg2.appendData(["BILL",g.cells(0,i), this.eAkunJasa.getText(), 'Akun Jasa','Pembatalan Tagihan karena kesalahan data awal','C',g.cells(3,i), '01010000','Simpan Pinjam','-','-',g.cells(1,i),"ARJS"]);
				}
				this.p3.sg.clear();
				g = this.p4.sg;
				for (var i = 0;i < g.getRowCount();i++){				
					if (g.cells(1,i) <= "201003" ) continue;
					//append ke jurnal								
					this.sg2.appendData(["ANGS",g.cells(0,i), this.eAkunPokok.getText(), 'Piutang Pokok','Pembatalan Tagihan karena kesalahan data awal','D',g.cells(2,i), '01010000','Simpan Pinjam','-','-',g.cells(1,i),"ARPK"]);
					this.sg2.appendData(["ANGS",g.cells(0,i), this.eAkunJasa.getText(), 'Piutang Jasa','Pembatalan Tagihan karena kesalahan data awal','D',g.cells(3,i), '01010000','Simpan Pinjam','-','-',g.cells(1,i),"ARJS"]);
					this.sg2.appendData(["ANGS",g.cells(0,i), this.akunUDP, 'Akun Deposit','Pembatalan Tagihan karena kesalahan data awal','C',g.cells(4,i), '01010000','Simpan Pinjam','-','-',g.cells(1,i),"AR"]);
						//d+= "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.akunUDP+"','"+this.eKet.getText()+"','D',"+parseNilai(this.eUdp.getText())+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','UDP','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
							//sql.add("insert into kop_depo(no_depo,tanggal,keterangan,dc,nilai,kode_agg,modul,jenis,periode,kode_lokasi,kode_pp,nik_app,no_del,no_link,kurs,kode_curr,nik_user,tgl_input) values "+
							//	    "('"+this.eBukti.getText()+"','"+this.dTgl.getDateString()+"','"+this.eKet.getText()+"','C',"+parseNilai(this.eUdp.getText())+",'"+this.cbbAgg.getText()+"','PINJ','UDP','"+this.ePeriode.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"','"+this.cbbPenerima.getText()+"','-','-',1,'IDR','"+this.app._userLog+"',now())");
				}
				var format = "22-BILLPU-", nobill, ix = 0;
				for (var i = 0;i < this.sg1.getRowCount();i++){
					tglNext = (tgl < 10 ? "0":"")+tgl + '-' + perAwal.substr(4,2) + '-' +  perAwal.substr(0,4);
					ix++;				
					if (perAwal > "201003") {
						nobill =  this.dataBill.get(perAwal).no_bill;
					}else nobill = format+perAwal;
					this.p3.sg.appendData([nobill,perAwal, this.sg1.cells(1,i),this.sg1.cells(2,i),this.sg1.cells(3,i), akun.get(perAwal)]);
					if (perAwal == this.billPeriode) break;
					perAwal = getNextPeriode(perAwal);
				}
				this.p4.sg.clear();
				var perAwal = this.dTgl2.getThnBln();
				var format = "22-ANSPJ-";
				for (var i = 0;i < this.sg1.getRowCount();i++){
					tglNext = (tgl < 10 ? "0":"")+tgl + '-' + perAwal.substr(4,2) + '-' +  perAwal.substr(0,4);
					if (perAwal > "201003") {
						nobill =  this.dataAngs.get(perAwal).no_angs;
					}else nobill = format+perAwal;
					this.p4.sg.appendData([nobill,perAwal, this.sg1.cells(1,i),this.sg1.cells(2,i),this.sg1.cells(3,i)]);
					if (perAwal == this.angsPeriode) break;
					perAwal = getNextPeriode(perAwal);					
				}				
				//data bill baru
				this.p5.sg.clear();
				var line;
				//data reverse				
				for (var i in this.dataBill.objList){
					if ( i > "201003"){
						line = this.dataBill.get(i);					
						this.p5.sg.appendData([line.no_bill, line.tgl, floatToNilai(-line.npokok), floatToNilai(-line.nbunga), floatToNilai(-line.tagihan), line.akun_pdpt]);											
					}
				}
				//data baru
				var g = this.p3.sg;
				for (var i=0; i < g.getRowCount();i++){
					if (g.cells(1,i) > "201003"){						
						this.p5.sg.appendData([g.cells(0,i), g.cells(1, i), g.cells(2,i), g.cells(3,i), g.cells(4,i), g.cells(5,i)]);
						this.sg2.appendData(["BILL",g.cells(0,i), this.eAkunJasa.getText(), 'Akun Jasa','Pembatalan Tagihan karena kesalahan data awal','D',g.cells(3,i), '01010000','Simpan Pinjam','-','-',g.cells(1,i),"ARJS"]);
						this.sg2.appendData(["BILL",g.cells(0,i), g.cells(5,i), 'Akun Pendapatan','Pembatalan Tagihan karena kesalahan data awal','C',g.cells(3,i), '01010000','Simpan Pinjam','-','-',g.cells(1,i),"PDPT"]);						
					}
				}
				//data angs baru
				this.p6.sg.clear();
				var line;
				//data reverse				
				for (var i in this.dataAngs.objList){
					if ( i > "201003"){
						line = this.dataAngs.get(i);					
						this.p6.sg.appendData([line.no_angs, line.tgl, floatToNilai(-line.npokok), floatToNilai(-line.nbunga), floatToNilai(-line.angsuran)]);
					}
				}
				var g = this.p4.sg;
				for (var i=0; i < g.getRowCount();i++){
					if (g.cells(1,i) > "201003"){						
						this.p6.sg.appendData([g.cells(0,i), g.cells(1, i), g.cells(2,i), g.cells(3,i), g.cells(4,i)]);
						this.sg2.appendData(["ANGS",g.cells(0,i), this.akunUDP, 'Akun Deposit','Pembatalan Tagihan karena kesalahan data awal','D',g.cells(4,i), '01010000','Simpan Pinjam','-','-',g.cells(1,i),"AR"]);
						this.sg2.appendData(["ANGS",g.cells(0,i), this.eAkunPokok.getText(), 'Piutang Pokok','Pembatalan Tagihan karena kesalahan data awal','C',g.cells(2,i), '01010000','Simpan Pinjam','-','-',g.cells(1,i),"ARPK"]);
						this.sg2.appendData(["ANGS",g.cells(0,i), this.eAkunJasa.getText(), 'Piutang Jasa','Pembatalan Tagihan karena kesalahan data awal','C',g.cells(3,i), '01010000','Simpan Pinjam','-','-',g.cells(1,i),"ARJS"]);						
					}
				}
				
			}catch(e){
				alert(e);
			}
		}
	},	
	doLoadData: function(sender){
		try{
			var sql = new server_util_arrayList();
			sql.add("select tgl_tagih, keterangan, akun_pjasa, akun_piutang from kop_pinj_m where no_pinj = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi +"' ");
			sql.add("select cicilan_ke,date_format (tgl_angs,'%d-%m-%Y') as tgl_angs, npokok, nbunga, npokok + nbunga as tagihan, saldo from kop_pinj_sch where no_pinj = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+ "' order by cicilan_ke");
			sql.add("select a.no_bill, a.npokok, a.nbunga, a.npokok+nbunga as tagihan, b.periode as tgl, b.akun_pdpt, b.tanggal, b.posted from kop_pinjbill_d a inner join kop_pinjbill_m b on b.no_bill = a.no_bill and b.kode_lokasi = a.kode_lokasi where a.no_pinj = '"+sender.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+ "' ");
			sql.add("select a.no_angs, a.npokok, a.nbunga, a.npokok + a.nbunga as angsuran, date_format (a.tanggal, '%Y%m') as tgl, b.tanggal, b.posted from kop_pinjangs_d a inner join kop_pinjangs_m b on b.no_angs = a.no_angs and b.kode_lokasi = a.kode_lokasi  where a.no_pinj = '"+sender.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+ "' ");
			var data = this.dbLib.getMultiDataProvider(sql,true);		
			this.data = data;
			if (typeof data != "string"){
				this.dTgl2.setText(data.result[0].rs.rows[0].tgl_tagih);
				this.eKet.setText(data.result[0].rs.rows[0].keterangan);
				this.eAkunJasa.setText(data.result[0].rs.rows[0].akun_pjasa);
				this.eAkunPokok.setText(data.result[0].rs.rows[0].akun_piutang);
				var line;
				this.sg1.clear();				
				for (var i in data.result[1].rs.rows){
					line = data.result[1].rs.rows[i];
					this.sg1.appendData([line.tgl_angs, floatToNilai(line.npokok), floatToNilai(line.nbunga), floatToNilai(parseFloat(line.tagihan)), floatToNilai(line.saldo)]);
				}
				this.p3.sg.clear();
				this.dataBill = new portalui_arrayMap();
				for (var i in data.result[2].rs.rows){
					line = data.result[2].rs.rows[i];
					this.p3.sg.appendData([line.no_bill, line.tgl, floatToNilai(line.npokok), floatToNilai(line.nbunga), floatToNilai(line.tagihan), line.akun_pdpt]);					
					this.dataBill.set(line.tgl, line);
				}
				this.billPeriode = line.tgl;
				this.p4.sg.clear();
				this.dataAngs = new portalui_arrayMap();
				for (var i in data.result[3].rs.rows){
					line = data.result[3].rs.rows[i];
					this.p4.sg.appendData([line.no_angs, line.tgl, floatToNilai(line.npokok), floatToNilai(line.nbunga), floatToNilai(line.angsuran)]);
					this.dataAngs.set(line.tgl, line);
				}				
				this.angsPeriode = line.tgl;
			}
		}catch(e){
			alert(e);
		}
	},
	FindBtnClick: function(sender){		
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.eBukti.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},	
	selectPage: function(page){
		this.sg1.clear();
		var rowPerPage = 30;
		var start = (page - 1) * rowPerPage;
		var finish = start + rowPerPage;
		if (finish > this.dataPinjaman.rs.rows.length) finish = this.dataPinjaman.rs.rows.length;
		for (var i = start;i < finish;i++){
			line = this.dataPinjaman.rs.rows[i];
			this.sg1.appendData([line.no_kontrak,line.kode_agg,line.nama,line.cicilan_ke,line.tgl_angs,floatToNilai(line.npokok),floatToNilai(line.nbunga),floatToNilai(line.ntagih),floatToNilai(line.angsuran),line.akun_piutang,line.akun_pjasa,line.no_pinj]);
		}
		this.sg1.validasi();
		this.sg1.setNoUrut(start);
		this.page = page;		
	},
	selectLoad: function(page){
		if (this.dataUpload === undefined) return;
		this.p3.sg.clear();
		var rowPerPage = 30;
		var start = (page - 1) * rowPerPage;
		var finish = start + rowPerPage;
		if (finish > this.dataAsli.rows.length) finish = this.dataAsli.rows.length;
		for (var i = start;i < finish;i++){
			line = this.dataAsli.rows[i];
			line = this.dataUpload.get(trim(line.kode_agg));
			if (line) this.p3.sg.appendData([trim(line.kode_agg), line.nama, floatToNilai(line.ntagih), floatToNilai(line.nilai_angs), floatToNilai(line.terpakai)]);
		}
		this.p3.sg.setNoUrut(start);
		this.page2 = page;				
	},
	doPager: function(sender, page){
		if (sender == this.sgn) this.selectPage(page);
		if (sender == this.p3.sgn) this.selectLoad(page);
		if (sender == this.p4.sgn) this.selectLoad(page);		
	}	
});

