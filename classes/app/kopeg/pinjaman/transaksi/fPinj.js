window.app_kopeg_pinjaman_transaksi_fPinj = function(owner){
	if (owner){
		try{		
			window.app_kopeg_pinjaman_transaksi_fPinj.prototype.parent.constructor.call(this, owner);
			this.className  = "app_kopeg_pinjaman_transaksi_fPinj";						
			owner.childFormConfig(this, "mainButtonClick","Pengajuan Pinjaman : Input", 0);
			this.maximize();
			//------------------------ login data ------------------------	
			uses("datePicker;radioButton;saiGrid;reportViewer;server_report_report");
			this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2});
			this.lTgl = new portalui_label(this,{bound:[20,21,100,18],caption:"Tanggal",underline:true});
			this.dTgl = new portalui_datePicker(this,{bound:[120,21,100,18], selectDate:[this,"doSelectDate"]});
			this.cStatus = new portalui_saiCB(this,{bound:[20,22,200,20],caption:"Status Bayar",items:["AUTODEBET","CASH"],tag:2});
			this.eKontrak = new portalui_saiLabelEdit(this,{bound:[20,23,290,20],caption:"No Bukti Pinj.",readOnly:true});			
			this.bGen = new portalui_button(this,{bound:[320,23,80,18],caption:"Generate", click:[this,"doClick"]});			
			this.eDok = new portalui_saiLabelEdit(this,{bound:[20,25,290,20],caption:"No Kontrak",readOnly:true});
			this.eMou = new portalui_saiLabelEdit(this,{bound:[20,35,500,20],caption:"No Dokumen"});
			this.lTgl = new portalui_label(this,{bound:[20,21,100,18],caption:"Tgl Awal Angsur",underline:true});
			this.dTgl2 = new portalui_datePicker(this,{bound:[120,21,100,18]});
			this.lTgl = new portalui_label(this,{bound:[20,24,100,18],caption:"Jenis Angsuran",underline:true});
			this.rb1 = new portalui_radioButton(this,{bound:[130,24,100,20],caption:"Anuitas", change:[this,"doRadioSelected"]});
			this.rb2 = new portalui_radioButton(this,{bound:[230,24,100,20],caption:"Flat",selected:true, change:[this,"doRadioSelected"]});
			this.eKet = new portalui_saiLabelEdit(this,{bound:[20,26,500,20],caption:"Keterangan"});
			this.cbbAgg = new portalui_saiCBBL(this,{bound:[20,27,200,20],caption:"Nasabah", btnClick:[this,"FindBtnClick"], readOnly:true});
			this.cbbApp = new portalui_saiCBBL(this,{bound:[20,28,200,20],caption:"NIK Approval", btnClick:[this,"FindBtnClick"], readOnly:true,tag:2});
			this.cbbDana = new portalui_saiCBBL(this,{bound:[20,9,200,20],caption:"Sumber Dana", btnClick:[this,"FindBtnClick"], readOnly:true,tag:2});
			this.eNilai = new portalui_saiLabelEdit(this,{bound:[20,29,200,20],caption:"Nilai Pinjaman", tipeText:ttNilai, text:"0", change:[this,"editChange"]});
			this.eLama = new portalui_saiLabelEdit(this, {bound:[320,29,200,20],caption:"Lama Bayar",tipeText:ttNilai, text:"0", change:[this,"editChange"]});
			this.eBunga = new portalui_saiLabelEdit(this,{bound:[20,31,200,20],caption:"Bunga(%) / Tahun",tipeText:ttNilai, text:"0", change:[this,"editChange"]});
			this.eMaterai = new portalui_saiLabelEdit(this,{bound:[20,32,200,20],caption:"Biaya Materai",tipeText:ttNilai, text:"0", change:[this,"editChange"]});
			this.eProvisi = new portalui_saiLabelEdit(this,{bound:[20,33,200,20],caption:"Biaya Provisi",tipeText:ttNilai, text:"0", change:[this,"editChange"]});
			this.eAsur = new portalui_saiLabelEdit(this,{bound:[20,34,200,20],caption:"Biaya Asuransi",tipeText:ttNilai,text:"0", change:[this,"editChange"]});
			this.i_viewer = new portalui_imageButton(this,{bound:[220,34,20,20],hint:"Hitung",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungClick"]});
			this.eBiaya = new portalui_saiLabelEdit(this,{bound:[320,34,200,20],caption:"Total Biaya-Biaya",tipeText:ttNilai, readOnly:true, text:"0"});
			this.eTerima = new portalui_saiLabelEdit(this,{bound:[20,35,200,20],caption:"Nilai Diterima",tipeText:ttNilai, readOnly:true, text:"0"});
			this.eBungaBln = new portalui_saiLabelEdit(this,{bound:[20,36,200,20],caption:"Nilai Bunga/Bln",tipeText:ttNilai, readOnly:true, text:"0"});
			this.eTagihan = new portalui_saiLabelEdit(this,{bound:[320,36,200,20],caption:"Nilai Tagihan/Bln",tipeText:ttNilai, readOnly:true, text:"0"});
			this.ePokokBln = new portalui_saiLabelEdit(this,{bound:[20,37,200,20],caption:"Nilai Pokok/Bln",tipeText:ttNilai, readOnly:true, text:"0"});
			this.ePiutang = new portalui_saiLabelEdit(this,{bound:[320,37,200,20],caption:"Nilai Piutang",tipeText:ttNilai, readOnly:true, text:"0"});
			//load sawal
			//this.bSawalSch = new portalui_button(this,{bound:[20,23,80,18],caption:"Sawal Sch", click:[this,"doSawal"]});
			//this.bSawalBill = new portalui_button(this,{bound:[120,23,80,18],caption:"Sawal Bill", click:[this,"doSawalBill"]});
			//pembayran angsuan di form kontrak brg
			
			this.rearrangeChild(10,22);
			setTipeButton(tbSimpan);
			this.p1 = new portalui_panel(this,{bound:[560,10,440,428],caption:"Schedule Angsuran"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,434,404],colCount:5,colWidth:[[0,1,2,3,4],[80,80,80,80,80]],colTitle:["Saldo Awal","Pokok","Margin","Saldo Akhir","Tgl Tagih"],
                     colFormat:[[0,1,2,3],[cfNilai, cfNilai, cfNilai, cfNilai, cfDate]], readOnly:true,defaultRow:1});
            
            this.viewer = new portalui_reportViewer(this,{bound:[0,0,this.width, this.height],visible:false});
            this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick",true);
            this.report = new server_report_report();
            this.report.addListener(this);
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
			this.setTabChildIndex();			
			this.dataAngsuran = [];
			this.ePeriode.setText(this.dTgl.getThnBln());
		}catch(e){
			systemAPI.alert("[app_kopeg_pinjaman_transaksi_fPinj]::oncreate lib : ",e);
		}
	}
};
window.app_kopeg_pinjaman_transaksi_fPinj.extend(window.portalui_childForm);
window.app_kopeg_pinjaman_transaksi_fPinj.implement({
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
					this.eKontrak.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_pinj_m','no_pinj',this.app._lokasi+"-PINJ"+this.ePeriode.getText().substr(2,4)+".",'0000'));
					this.eDok.setText(this.eKontrak.getText());
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.rb1.isSelected()) var jnsAngs = 'A';								
					else if (this.rb2.isSelected()) var jnsAngs = 'F';
					this.generateSch();
					sql.add("insert into kop_pinj_m (no_pinj,no_kontrak,keterangan,tanggal,periode,tgl_tagih,kode_agg,status_bayar,jenis_angs, "+
					  	    "nilai,p_bunga,lama_bayar,nilai_mat,nilai_prov,nilai_asur,nilai_bunga,nilai_pokok,nilai_tagihan, "+
						    "progress,akun_piutang,akun_pjasa,nik_app,status_aktif,no_komp,nik_user,tgl_input,kode_lokasi,no_dana,no_spbasur,no_mou,no_ap) values "+
						    "('"+this.eKontrak.getText()+"','"+this.eDok.getText()+"','"+this.eKet.getText()+"','"+this.dTgl.getDateString()+"','"+this.ePeriode.getText()+"','"+this.dTgl2.getDateString()+"','"+this.cbbAgg.getText()+"','"+this.cStatus.getText().substr(0,1)+"','"+jnsAngs+"', "+
						    " "+parseNilai(this.eNilai.getText())+","+parseNilai(this.eBunga.getText())+","+parseNilai(this.eLama.getText())+","+parseNilai(this.eMaterai.getText())+","+parseNilai(this.eProvisi.getText())+","+parseNilai(this.eAsur.getText())+","+parseNilai(this.eBungaBln.getText())+","+parseNilai(this.ePokokBln.getText())+","+parseNilai(this.eTagihan.getText())+", "+
						    "'0','-','-','"+this.cbbApp.getText()+"','1','-','"+this.app._userLog+"',now(),'"+this.app._lokasi+"','"+this.cbbDana.getText()+"','-','"+this.eMou.getText()+"','-')");
				  
					var j = 0; 				  
					for (var i=0; i < this.sg1.rows.getLength(); i++){
					  j = i+1;					
					  sql.add("insert into kop_pinj_sch(no_pinj,no_kontrak,kode_lokasi,cicilan_ke,npokok,nbunga,saldo,tgl_angs,status_gen,no_bill) values "+
						      "('"+this.eKontrak.getText()+"','"+this.eDok.getText()+"','"+this.app._lokasi+"',"+j+","+parseNilai(this.sg1.cells(1,i))+","+parseNilai(this.sg1.cells(2,i))+","+parseNilai(this.sg1.cells(3,i))+",'"+this.sg1.getCell(4,i).substr(6,4)+'/'+this.sg1.getCell(4,i).substr(3,2)+'/'+this.sg1.getCell(4,i).substr(0,2)+"',0,'-')");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.eKontrak);		
					this.sg1.clear(1);
				}
				break;
			case "simpan" :	
				var line,data = this.dbLib.runSQL("select no_kontrak from kop_pinj_m "+
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
			this.eKontrak.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'kop_pinj_m','no_pinj',this.app._lokasi+"-PINJ"+this.ePeriode.getText().substr(2,4)+".",'0000'));
			this.eDok.setText(this.eKontrak.getText());
			this.eMou.setFocus();
		}
	},
	doHitungClick: function(sender){
		if ((this.eLama.getText() != "0") && (this.eNilai.getText() != "0") && (this.eBunga.getText() != "0")) {
			this.generateSch();
		}
	},
	FindBtnClick: function(sender){
	    try{          
    		if (sender == this.cbbDana){
    			this.standarLib.showListData(this, "Daftar Sumber Dana",sender,undefined, 
    										  "select no_bukti, no_kontrak from kop_dana_m where kode_lokasi ='"+this.app._lokasi+"' and jenis in ('ALL','PUANG')",
    										  "select count(no_bukti)      from kop_dana_m where kode_lokasi ='"+this.app._lokasi+"' and jenis in ('ALL','PUANG')",
    										  ["no_bukti","no_kontrak"],"and",["No Bukti","No Kontrak"],false);
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
       if ((sender == this.eMaterai) || (sender == this.eProvisi) || (sender == this.eAsur)){
          this.eBiaya.setText(floatToNilai(nilaiToFloat(this.eMaterai.getText()) + nilaiToFloat(this.eProvisi.getText()) + nilaiToFloat(this.eAsur.getText()) ));
          this.eTerima.setText(floatToNilai(nilaiToFloat(this.eNilai.getText()) - nilaiToFloat(this.eBiaya.getText())));
       }else if (sender == this.eNilai || sender == this.eBunga || sender == this.eLama){
             if (sender == this.eNilai) this.eTerima.setText(floatToNilai(nilaiToFloat(this.eNilai.getText()) - nilaiToFloat(this.eBiaya.getText())));
       }
    },
    doRadioSelected: function(sender,selected){                     
        if ((this.eLama.getText() != "0") && (this.eNilai.getText() != "0") && (this.eBunga.getText() != "0")) this.generateSch();        
    },
	genDataPinjSawal: function(index){
				var sql = new server_util_arrayList();
					line = this.dataPinj[index];									
					var lm = parseFloat(line.lama_bayar);
					var so = parseFloat(line.nilai);
					var bunga = parseFloat(line.p_bunga);				
					var pokok = Math.round(so / lm);
					var margin = Math.round(so * bunga / 100 / 12);
					var tot = so + (margin * lm);
					var angs = Math.round(tot / lm);
					var pay = so;
					var piutang = so+margin;
					var tagihan = angs;
					var tglNext = perAwal = line.perawal;
					var tgl = line.tgl;
					this.dataAngsuran = [];
					var k = 0;
					for (var j = 0;j < lm;j++){
						tglNext = tgl + '/' + perAwal.substr(4,2) + '/' +  perAwal.substr(0,4);
						k = j+1;
						if (line.jenis_angs == "F"){								
							this.dataAngsuran=[floatToNilai(so),floatToNilai(pokok),floatToNilai(margin),floatToNilai(so - pokok),tglNext,floatToNilai(k),line.no_pinj];
							so = so - pokok;
							if (so < pokok) pokok = so;
							else if ( j == lm - 2) pokok = so; 
						}else{					
							var value = annuity(bunga /12 / 100, lm - j, lm, so);					
							eval("value = "+value+";");
							this.dataAngsuran=[floatToNilai(value.totPayment),floatToNilai(value.pokok),floatToNilai(value.margin),floatToNilai(value.totPayment - value.pokok),tglNext,floatToNilai(k),line.no_pinj];
							tagihan = value.payment;
							pokok = value.pokok;
							margin = value.margin;
						}
						perAwal = getNextPeriode(perAwal);
						sql.add("insert into kop_pinj_sch(no_pinj,no_kontrak,kode_lokasi,cicilan_ke,npokok,nbunga,saldo,tgl_angs,status_gen,no_bill) values "+
								"('"+line.no_pinj+"','"+line.no_pinj+"','"+this.app._lokasi+"',"+k+","+parseNilai(this.dataAngsuran[1])+","+parseNilai(this.dataAngsuran[2])+","+parseNilai(this.dataAngsuran[3])+",'"+this.dataAngsuran[4].substr(6,4)+'/'+this.dataAngsuran[4].substr(3,2)+'/'+this.dataAngsuran[4].substr(0,2)+"',0,'-')");
					}	
					this.dbLib.execArraySQL(sql);
	},
	doSawal: function(sender){
		try {
			//var data = this.dbLib.getDataProvider("select *,date_format(tgl_tagih,'%Y%m') as perawal,date_format(tgl_tagih,'%d') as tgl from kop_pinj_m where kode_lokasi='"+this.app._lokasi+"'");
			var data = this.dbLib.getDataProvider("select *,date_format(tgl_tagih,'%Y%m') as perawal,date_format(tgl_tagih,'%d') as tgl from kop_pinj_m where kode_lokasi='"+this.app._lokasi+"' and no_pinj in "+
												 "('P/BMI-5/2005/0163','P/BMI-5/2005/0129', 'P/BMI-5/2005/0162','P/D/0509/018','P/BMI-6/2005/0060','P/BSM/2005/0109','P/D/0607/083','P/BMI-5/2005/0158','P/BMI-9/2005/0197','P/BMI-9/2005/0201','P/D/0607/072','P/D/0607/081','P/D/0909/025','P/BMI-9/2005/0062','P/BMI-9/2005/0099','P/BMI-9/2005/0120','P/BMI-9/2005/0123','P/BMI-9/2005/0149','P/BMI-9/2005/0179','P/D/0712/006','P/D/0909/024','P/D/0909/026','P/D/0912/034','P/D/0912/035','P/D/0912/036')");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				this.dataPinj = data.rs.rows;
				this.procId = 0;
				this.genDataPinjSawal(this.procId);
			}									  
		}
		catch(e) {
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							/*
							if (this.dataPinj.length > this.procId){
								systemAPI.alert("Pinj "+this.dataPinj[this.procId].no_pinj+" Selesai.");
								this.procId++;
								this.genDataPinjSawal(this.procId);
							}else
							*/
							{
								this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.eKontrak.getText()+")");							
								//this.app._mainForm.bClear.click();
								this.nama_report="server_report_kopeg_rptPinj3";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_pinj='"+this.eKontrak.getText()+"' ";			
								this.filter = this.filter2+"//"+this.app._lokasi;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.report.preview(this.nama_report,this.filter,1,1,this.showFilter, this.app._namalokasi,this.filter2, undefined, "array");								
								this.page = 1;
								this.allBtn = false;
							}
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }			
	    if (sender == this.report){
			if (result instanceof portalui_arrayList){						
				this.viewer.previewMultiPage(result.objList, false, ["Perjanjian Kontrak","Surat Kuasa","Schedule Angsuran"]);
			}else this.viewer.preview(result);	
		}
	},
	doSelectedPage: function(sender, page)
	{
		this.report.preview(this.nama_report,this.filter, page,this.pager, this.showFilter,this.lokasi, this.filter2, undefined, "array");
		this.page=page;
		this.allBtn = false;
	},
	doCloseReportClick: function(sender)
	{
	  switch(sender.getName())
	  {
	    case "allBtn" :
		  this.page = 1;
		  this.allBtn = true;
		  this.report.preview(this.nama_report,this.filter,this.page, this.viewer.getTotalPage() * this.pager, this.showFilter,this.lokasi,this.filter2);
	      break;
	    case "pdfBtn" :
	      this.viewer.useIframe(this.report.createPdf(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.lokasi,this.showFilter,this.filter2));
	      break;
	    case "PreviewBtn" :
			window.open(this.report.previewWithHeader(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
			break;
		case "PrintBtn" :
	      try
	      {
			this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,(this.allBtn ? 1 : this.page), (this.allBtn ? this.viewer.getTotalPage() * this.pager : this.pager), this.showFilter, this.lokasi,this.filter2));
	        window.frames[this.viewer.getFullId() +"_iframe"].focus();
	        window.frames[this.viewer.getFullId() +"_iframe"].print();
	        
	        var cnv = undefined;
	        if (cnv != undefined)
	        {
	          cnv.focus();
	          cnv.print();
	        }
	      }catch(e)
	      {alert(e);}
	      break; 
	    default :
	        this.viewer.setVisible(false);	      	
	      	this.app._mainForm.pButton.setVisible(true);
	      	this.app._mainForm.reportNavigator.setVisible(false);  
	      	this.app._mainForm.bClear.click();
	      break;
	  }
	},	
	doRowPerPageChange: function(sender, rowperpage)
	{
		this.pager = rowperpage;
		this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,this.pager,this.filter2));
		this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
		this.app._mainForm.reportNavigator.rearrange();
		this.doSelectedPage(undefined, 1);
	}
});
