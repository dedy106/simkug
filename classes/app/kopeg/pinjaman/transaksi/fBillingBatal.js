window.app_kopeg_pinjaman_transaksi_fBillingBatal = function(owner){
	if (owner){
		try{		
			window.app_kopeg_pinjaman_transaksi_fBillingBatal.prototype.parent.constructor.call(this, owner);
			this.className  = "app_kopeg_pinjaman_transaksi_fBillingBatal";						
			owner.childFormConfig(this, "mainButtonClick","Form Pembatalan Akrual Jasa Pinjaman: Input", 0);			
			this.maximize();
			//------------------------ login data ------------------------	
			uses("portalui_saiCBB;portalui_datePicker;portalui_radioButton");
			this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,20,200,20],caption:"Periode",change:[this,"doChange"],readOnly:true,tag:2});
			this.lTgl = new portalui_label(this,{bound:[20,21,100,18],caption:"Tanggal",underline:true});
			this.dTgl = new portalui_datePicker(this,{bound:[120,21,100,18],selectDate:[this,"doSelectDate"]});
			this.eBukti = new portalui_saiLabelEdit(this,{bound:[20,23,290,20],caption:"No Batal",readOnly:true});
			this.bGen = new portalui_button(this,{bound:[320,23,80,18],caption:"Generate", click:[this,"doClick"]});			
			this.eDok = new portalui_saiLabelEdit(this,{bound:[20,22,290,20],caption:"No Dokumen"});
			this.eKet = new portalui_saiLabelEdit(this,{bound:[20,24,500,20],caption:"Deskripsi"});
			this.cbbPenerima = new portalui_saiCBBL(this,{bound:[20,25,200,20],caption:"Disetujui Oleh", btnClick:[this,"FindBtnClick"], tag:2});
			this.cbbAgg = new portalui_saiCBBL(this,{bound:[20,27,200,20],caption:"Nasabah", btnClick:[this,"FindBtnClick"], change:[this,"doChange"]});
			this.cbbKontrak = new portalui_saiCBB(this,{bound:[20,28,200,20],caption:"No Kontrak",btnClick:[this,"FindBtnClick"],btnRefreshClick:[this,"doLoadData"]});			
			this.eTotJasa = new portalui_saiLabelEdit(this,{bound:[740,28,180,20],caption:"Total Jasa",tipeText:ttNilai, readOnly:true, text:"0",labelWidth:80});
			
			this.p1 = new portalui_panel(this,{bound:[20,35,900,315],caption:"Daftar Rincian Akru Jasa"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,900,290],colCount:9,
			    colWidth:[[0,1,2,3,4,5,6,7,8],[60,120,240,70,60,80,70,70,80]],
				colTitle:["Status","No Bukti","Keterangan","Cicilan Ke","Periode","Tanggal","AR Jasa","Akun Jasa","Nilai Jasa"],
                colFormat:[[8],[cfNilai]],defaultRow:1,readOnly:true,buttonStyle:[[0],[bsAuto]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","BATAL"]})]],change:[this,"doChangeCell"],nilaiChange:[this,"doSgChange"]});    
				
			this.rearrangeChild(10,22);
			setTipeButton(tbSimpan);
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
			this.setTabChildIndex();			
			this.dataAngsuran = [];
			this.ePeriode.setText(this.dTgl.getThnBln());
		
			this.cbbAgg.setSQL("select kode_agg, nama from kop_agg where kode_lokasi = '"+this.app._lokasi+"'",["kode_agg","nama"],false,["Kode","Nama"],"and","Data Nasabah");
			this.cbbPenerima.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan");
		}catch(e){
			systemAPI.alert("[app_kopeg_pinjaman_transaksi_fBillingBatal]::oncreate lib : ",e);
		}
	}
};
window.app_kopeg_pinjaman_transaksi_fBillingBatal.extend(window.portalui_childForm);
window.app_kopeg_pinjaman_transaksi_fBillingBatal.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					this.eBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pinjbill_m","no_bill",this.app._lokasi+"-BPJ"+this.ePeriode.getText().substr(2,4)+".","0000"));
					uses("server_util_arrayList");
					var nilai = nilaiToFloat(this.eTotJasa.getText());
					var sql = new server_util_arrayList();					
					sql.add("insert into kop_pinjbill_m (no_bill,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,no_del,no_link,no_ref,akun_pdpt) values  "+
							"('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.eKet.getText()+"','"+this.dTgl.getDateString()+"',"+nilai+",'"+this.ePeriode.getText()+"','"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.cbbPenerima.getText()+"','"+this.app._userLog+"',now(),'F','IDR',1,'-','-','-','"+this.akunPdpt+"')");
					
					var idx=0;
					var d="insert into kop_pinjbill_j (no_bill,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values ";		
					for (var i=0;i< this.sg1.getRowCount();i++){
						if (this.sg1.cells(0,i) == "BATAL") {
							sql.add("update kop_pinj_sch set status_gen='0',no_bill='-' where cicilan_ke ="+parseNilai(this.sg1.cells(3,i))+" and no_kontrak='"+this.cbbKontrak.getText()+"' and no_pinj='"+this.cbbKontrak.dataFromList[1]+"' and no_bill='"+this.sg1.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
							sql.add("update kop_pinjbill_d set no_del='"+this.eBukti.getText()+"' where cicilan_ke ="+parseNilai(this.sg1.cells(3,i))+" and no_kontrak='"+this.cbbKontrak.getText()+"' and no_pinj='"+this.cbbKontrak.dataFromList[1]+"' and no_bill='"+this.sg1.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");							
							sql.add("insert into kop_pinjbill_d (no_bill,no_pinj,no_kontrak,kode_lokasi,cicilan_ke,npokok,nbunga,akun_pjasa,akun_pdpt,dc,no_del) values "+
									"('"+this.eBukti.getText()+"','"+this.cbbKontrak.dataFromList[1]+"','"+this.cbbKontrak.getText()+"','"+this.app._lokasi+"',"+parseNilai(this.sg1.cells(3,i))+",0,"+parseNilai(this.sg1.cells(8,i))+",'"+this.sg1.cells(6,i)+"','"+this.sg1.cells(7,i)+"','C','"+this.sg1.cells(1,i)+"')");
					
							if (idx > 0) d+= ",";
							idx++;
							d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.sg1.cells(6,i)+"','"+this.eKet.getText()+"','C',"+parseNilai(this.sg1.cells(8,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','ARJS','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
							d+= ",";
							idx++;
							d += "('"+this.eBukti.getText()+"','"+this.eDok.getText()+"','"+this.dTgl.getDateString()+"',"+idx+",'"+this.sg1.cells(7,i)+"','"+this.eKet.getText()+"','D',"+parseNilai(this.sg1.cells(8,i))+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','PINJ','PDPT','"+this.ePeriode.getText()+"','IDR',1,'"+this.app._userLog+"',now())";
						}
					}
					sql.add(d);					
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
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :	
				var tot = nilaiToFloat(this.eTotJasa.getText());
				if (tot <= 0){
					system.alert(this,"Transaksi tidak valid.","Nilai pembatalan tidak boleh kurang dari atau sama dengan nol.");
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
	doSelectDate: function(sender, y, m, d){
       this.ePeriode.setText(sender.getThnBln());
    },
	doClick: function(sender){
		if (sender == this.bGen){
			this.eBukti.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kop_pinjbill_m","no_bill",this.app._lokasi+"-BP"+this.ePeriode.getText().substr(2,4)+".","0000"));
			this.eDok.setFocus();
		}
	},
	doLoadData: function(sender){
		if (this.cbbKontrak.getText() != "" && (this.ePeriode.getText() != "")){
			var data = this.dbLib.getDataProvider("select a.no_bill,c.keterangan,a.cicilan_ke,date_format(c.tanggal,'%Y%m') as periode,date_format(c.tanggal,'%d/%m/%Y') as tanggal,case a.dc when 'D' then a.nbunga else -a.nbunga end as nbunga,a.akun_pjasa,a.akun_pdpt "+
			                                      "from kop_pinjbill_d a inner join kop_pinjbill_m c on a.no_bill=c.no_bill and a.kode_lokasi=c.kode_lokasi "+
												  "where a.no_del='-' and a.dc<>'C' and a.no_kontrak='"+this.cbbKontrak.getText()+"' and a.no_pinj='"+this.cbbKontrak.dataFromList[1]+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
												  "order by a.cicilan_ke"); 
			eval("data = "+data+";");
			var periode = ""; 
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					this.sg1.appendData(['APP',line.no_bill,line.keterangan,line.cicilan_ke,line.periode,line.tanggal,line.akun_pjasa,line.akun_pdpt,floatToNilai(line.nbunga)]);
				}
				this.sg1.validasi();
			}
		} else {
			system.alert(this,"Kontrak dan Periode tidak valid.","");
		}
	},
	FindBtnClick: function(sender){
		if (sender == this.cbbKontrak){
			this.standarLib.showListData(this, "Daftar Kontrak",sender,undefined, 
										  "select a.no_kontrak, a.no_pinj from kop_pinj_m a inner join kop_pinj_spb b on a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi "+
										  "                                                 inner join spb_m c on b.no_spb=c.no_spb and b.kode_lokasi=c.kode_lokasi "+
										  "                                                 inner join kas_d d on c.no_spb=d.no_bukti and d.kode_lokasi=c.kode_lokasi "+
										  "                                                 inner join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi "+
										  "where a.kode_agg='"+this.cbbAgg.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.progress = '1' and a.status_aktif in ('0','1') and c.no_del='-' and e.no_del='-'",
										  "select count(a.no_pinj) from kop_pinj_m a        inner join kop_pinj_spb b on a.no_kontrak=b.no_kontrak and a.kode_lokasi=b.kode_lokasi "+
										  "                                                 inner join spb_m c on b.no_spb=c.no_spb and b.kode_lokasi=c.kode_lokasi "+
										  "                                                 inner join kas_d d on c.no_spb=d.no_bukti and d.kode_lokasi=c.kode_lokasi "+
										  "                                                 inner join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi "+
										  "where a.kode_agg='"+this.cbbAgg.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' and a.progress = '1' and a.status_aktif in ('0','1') and c.no_del='-' and e.no_del='-'",
										  ["no_kontrak","no_pinj"],"and",["No Kontrak","No Pinjaman"],false);
			this.sg1.clear(1);
		}
		if (sender == this.cbbAgg){
			this.standarLib.showListData(this, "Daftar Nasabah",sender,undefined, 
										  "select kode_agg, nama  from kop_agg where kode_lokasi ='"+this.app._lokasi+"'",
										  "select count(kode_agg) from kop_agg where kode_lokasi ='"+this.app._lokasi+"'",
										  ["kode_agg","nama"],"and",["Kode Nasabah","Nama"],false);
			this.cbbKontrak.setText("",""); this.sg1.clear(1);
		}
		if (sender == this.cbbPenerima){
			this.standarLib.showListData(this, "Daftar Karyawan",sender,undefined, 
										  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
										  ["nik","nama"],"and",["NIK","Nama"],false);
		}
	},
	doChangeCell: function(sender, col, row){
		this.sg1.validasi();
	},
	doSgChange: function(sender, col, row){		
		var totJasa=0;
		for (var i = 0;i < this.sg1.getRowCount();i++){
			if (this.sg1.cells(0,i) == "BATAL" && this.sg1.cells(8,i) != "") {				
					totJasa += nilaiToFloat(this.sg1.cells(8,i));
			}
		}
		this.eTotJasa.setText(floatToNilai(totJasa));
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
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});

